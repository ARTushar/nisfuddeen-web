import verifyPremiumUser from "../../../../lib/middlewares/verifyPremiumUser";
import verifyUser from "../../../../lib/middlewares/verifyUser";
import { createNC } from "../../../../lib/utils/ncHandlers";
import Link from '../../../../lib/models/profile/Link';
import createValidation from '../../../../lib/middlewares/validate';
import createLink from '../../../../lib/validations/createLink';
import { createBadRequestError } from '../../../../lib/utils/errorCreators';

const handler = createNC();
const linkValidation = createValidation(createLink, 'body')

handler
  .get(verifyUser, verifyPremiumUser, async (req, res, next) => {
      try {
          const links = await Link.getLinks(req.user.id);
          res.status(200).json(links);
      } catch (err) {
          next(err);
      }
  })
  .post(verifyUser, verifyPremiumUser, linkValidation, async (req, res, next) => {
      try {
          const added = await Link.createLink(req.user.id, req.body.id, req.body.relation);
          if(!added) return next(createBadRequestError('Invalid ID'));
          res.status(200).json(added);
      } catch (err) {
          next(err);
      }
  });

export default handler;