import { createForbiddenError } from "../utils/errorCreators";

function verifyModeratorOrAdmin(req, res, next) {
  if (req.user.accountType === 'moderator' ||
    req.user.accountType === 'admin') {
    next();
  } else {
    next(createForbiddenError('Unauthorized User'));
  }
}

export default verifyModeratorOrAdmin;