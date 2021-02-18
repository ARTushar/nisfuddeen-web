import { createError } from "../utils/ncHandlers";

function verifyAdmin(req, res, next) {
  if (req.user.accountType === 'admin') {
    next();
  } else {
    next(createError(401, 'unauthorized'));
  }
}

export default verifyAdmin;