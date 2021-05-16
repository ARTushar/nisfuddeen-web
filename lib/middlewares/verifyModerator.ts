import { createForbiddenError, createUnauthorizedError } from "../utils/errorCreators";

function verifyModerator(req, res, next) {
  if (req.user.accountType === 'moderator') {
    next();
  } else {
    next(createForbiddenError('Unauthorized user'));
  }
}

export default verifyModerator;