import nc from 'next-connect';
import passport from 'passport';
import common from '../../../lib/middlewares/common';
import { getToken } from '../../../lib/utils/authHelpers';
import { createError, onError, onNoMatch } from '../../../lib/utils/ncHandlers';


const handler = nc({ onNoMatch: onNoMatch, onError: onError });

handler.use(common)

handler
  .post((req, res, next) => {
    passport.authenticate('local')(req, res, () => {
      const token = getToken(req.user);
      const refreshToken = getToken(req.user, 'refresh');
      res.status(200).json({
        success: true,
        token,
        refreshToken
      })

    })
  });

export default handler;