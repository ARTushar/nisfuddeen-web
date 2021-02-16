export default verifyModerator = (req, res, next) => {
  if (req.user.accountType === 'moderator') {
      next();
  } else {
      let err = new Error('You are not authorized to perform this operation!');
      err.status = 403;
      return next(err);
  }
}