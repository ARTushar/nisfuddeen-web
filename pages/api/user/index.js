import verifyUser from "../../../lib/middlewares/verifyUser";
import User from "../../../lib/models/User";
import UserDetail from "../../../lib/models/UserDetail";
import { homeUserFields, restrictedUserFields, saveUserFields } from "../../../lib/utils/helpers";
import { createError, createNC } from "../../../lib/utils/ncHandlers";

const handler = createNC();

handler
  .get(verifyUser, (req, res, next) => {
    UserDetail.find({userId: req.user._id})
      .populate('userId', restrictedUserFields)
      .populate('wishtList', homeUserFields)
      .then(user => {
        res.status(200).json(user);
      }, err => next(err))
      .catch(err => next(err));
  })
  .post(verifyUser, (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      const updatedUser = await saveUserFields(user, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(createError(500, error.message));
    }
  })

export default handler;