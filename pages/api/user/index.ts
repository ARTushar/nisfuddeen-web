import verifyUser from "../../../lib/middlewares/verifyUser";
import User from '../../../lib/models/user/User';
import { createNC } from "../../../lib/utils/ncHandlers";
import createBiodata from '../../../lib/dataAccessLayer/entities/biodata/createBiodata';
import { createBadRequestError } from '../../../lib/utils/errorCreators';
import createValidation from '../../../lib/middlewares/validate';
import updateUser from '../../../lib/validations/updateUser';

const handler = createNC();
const updateUserValidation = createValidation(updateUser, 'body');

handler
  .get(verifyUser, async (req, res, next) => {
      try {
          const user = await User.getById(req.user.id);
          res.status(200).json(user);
      } catch (error) {
          next(error);
      }
  })
  .put(verifyUser, updateUserValidation, async (req, res, next) => {
      try {
          req.body.id = req.user.id;
          const user = await User.updateUser(req.body);
          if(!user) return next(createBadRequestError('No field to update'));
          res.status(200).json(user);
      } catch (error) {
          next(error);
      }
  })

export default handler;