import { createForbiddenError } from "../utils/errorCreators";

function verifyAdmin(req, res, next) {
  if (req.user.accountType === 'admin') {
    next();
  } else {
    next(createForbiddenError('Not Allowed to use this feature'));
  }
}

export default verifyAdmin;