import verifyModeratorOrAdmin from "../../../lib/middlewares/verifyModeratorOrAdmin";
import verifyUser from "../../../lib/middlewares/verifyUser";
import { createNC } from "../../../lib/utils/ncHandlers";
import createValidation from '../../../lib/middlewares/validate';
import idCheck from '../../../lib/validations/idCheck';
import User from '../../../lib/models/user/User';

const handler = createNC();
const validateId = createValidation(idCheck, 'query');

handler
  .get(verifyUser, verifyModeratorOrAdmin, validateId, async (req, res, next) => {
      try {
          const user = await User.getById(req.query.id);
          res.status(200).json(user);
      } catch (error) {
          next(error);
      }
  });

export default handler;