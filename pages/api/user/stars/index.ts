import verifyPremiumUser from "../../../../lib/middlewares/verifyPremiumUser";
import verifyUser from "../../../../lib/middlewares/verifyUser";
import { createNC } from "../../../../lib/utils/ncHandlers";
import Star from '../../../../lib/models/profile/Star';
import createValidation from '../../../../lib/middlewares/validate';
import starType from '../../../../lib/validations/starType';

const handler = createNC();
const starTypeValidation = createValidation(starType, 'query');

handler
  .get(verifyUser, verifyPremiumUser, starTypeValidation, async (req, res, next) => {
      try {
          const wishList = req.query.type === 'outgoing'?
            await Star.getStarsBy(req.user.id):
            await Star.getStarsTo(req.user.id);
          req.status(200).json(wishList);
      } catch (error) {
          next(error);
      }
  })

export default handler;