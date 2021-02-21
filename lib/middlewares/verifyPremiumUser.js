import { createForbiddenError } from "../utils/errorCreators";

function verifyPremiumUser(req, res, next) {
  if (req.user.priviledgeType === 'premium') {
    next();
  } else {
    next(createForbiddenError('This is a premium feature'));
  }
}

export default verifyPremiumUser;