import { createForbiddenError } from "../utils/errorCreators";

function verifyModeratorOrAdmin(req, res, next) {
  if (req.user.accountType === 'moderator' ||
    req.user.accountType === 'admin') {
    next();
  } else {
    next(createForbiddenError('Not allowd to use this feature'));
  }
}

export default verifyModeratorOrAdmin;