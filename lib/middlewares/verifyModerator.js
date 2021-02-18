import { createError } from "../utils/ncHandlers";

function verifyModerator(req, res, next) {
  if (req.user.accountType === 'moderator') {
    next();
  } else {
    next(createError(401, 'unauthorized'));
  }
}

export default verifyModerator;