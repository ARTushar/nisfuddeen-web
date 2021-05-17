import verifyPremiumUser from "../../../../lib/middlewares/verifyPremiumUser";
import verifyUser from "../../../../lib/middlewares/verifyUser";
import { createNC } from "../../../../lib/utils/ncHandlers";
import createValidation from '../../../../lib/middlewares/validate';
import idCheck from '../../../../lib/validations/idCheck';
import Star from '../../../../lib/models/profile/Star';
import { createBadRequestError } from '../../../../lib/utils/errorCreators';

const handler = createNC();

const idValidation = createValidation(idCheck, 'query');

handler
  .post(verifyUser, verifyPremiumUser, idValidation, async (req, res, next) => {
      try {
          const star = await Star.createStar(req.user.id, req.query.id);
          if(!star) return next(createBadRequestError('Invalid ID'));
          res.status(200).json({ star })
      } catch (err) {
          next(err);
      }
  })
  .delete(verifyUser, verifyPremiumUser, idValidation, async (req, res, next) => {
      try {
          const removed = await Star.deleteStar(req.user.id, req.query.id);
          if(!removed) return next(createBadRequestError('Invalid ID'));
          res.status(200).json({ removed })
      } catch (err) {
          next(err);
      }
  });

export default handler;