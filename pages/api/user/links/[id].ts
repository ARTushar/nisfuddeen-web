import verifyPremiumUser from "../../../../lib/middlewares/verifyPremiumUser";
import verifyUser from "../../../../lib/middlewares/verifyUser";
import { createNC } from "../../../../lib/utils/ncHandlers";
import createValidation from '../../../../lib/middlewares/validate';
import idCheck from '../../../../lib/validations/idCheck';
import Link from '../../../../lib/models/profile/Link';
import updateLinkStatus from '../../../../lib/validations/updateLinkStatus';
import { createBadRequestError } from '../../../../lib/utils/errorCreators';

const handler = createNC();
const linkIdValidation = createValidation(idCheck, 'query')
const linkUpdateValidation = createValidation(updateLinkStatus, 'body')

handler
  .put(verifyUser, verifyPremiumUser, linkIdValidation, linkUpdateValidation, async (req, res, next) => {
      try {
          const link = await Link.updateLinkStatus(req.user.id, req.query.id, req.body.status);
          if(!link) return next(createBadRequestError('Invalid Id'));
          res.status(200).json({link});
      } catch (error) {
          next(error);
      }
  })
  .delete(verifyUser, verifyPremiumUser, linkIdValidation,  async (req, res, next) => {
      try {
          const removed = await Link.deleteLink(req.user.id, req.query.id);
          if(!removed) return next(createBadRequestError('Invalid Id'));
          res.status(200).json({removed});
      } catch (error) {
          next(error);
      }
  });

export default handler;