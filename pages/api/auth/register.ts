import { createNC } from '../../../lib/utils/ncHandlers';
import verifyUser from '../../../lib/middlewares/verifyUser';
import User from '../../../lib/models/user/User';
import { debug } from '../../../lib/utils/helpers';
import createValidation from '../../../lib/middlewares/validate';
import register from '../../../lib/validations/register';
import { createBadRequestError } from '../../../lib/utils/errorCreators';

const handler = createNC();
const registerValidate = createValidation(register, ['body']);


handler
  .post(verifyUser, registerValidate, async (req, res, next) => {
      try {
          // debug("register_before_user", req.user);
          const user = await User.updateUser({
              id: req.user.id,
              gender: req.body.gender,
              name: req.body.name,
              mobileNumber: req.body.mobileNumber,
              accountType: req.body.accountType,
              completeAccount: true
          });
          debug('register_api', user);
          if(!user) {
              throw createBadRequestError("No fields to update");
          }
          res.status(200).json({ success: true });
      } catch (err) {
          next(err);
      }
  });

export default handler;