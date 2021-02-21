import verifyUser from "../../../lib/middlewares/verifyUser";
import User from "../../../lib/models/User";
import { fetchUserInformation, filterSensitiveUserFields, restrictedUserFields, saveUserFields } from "../../../lib/utils/helpers";
import { createError, createNC } from "../../../lib/utils/ncHandlers";

const handler = createNC();

handler
  .get(verifyUser, async (req, res, next) => {
    try {
      const user = await fetchUserInformation(req.user._id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  })
  .put(verifyUser, async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      let updatedUser = await saveUserFields(user, req.body);
      // TO DO: try without fetching userinfo again
      // Done
      updatedUser = filterSensitiveUserFields(updatedUser);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(createError(500, error.message));
    }
  })

export default handler;