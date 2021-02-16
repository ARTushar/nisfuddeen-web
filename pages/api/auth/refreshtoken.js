import nc from 'next-connect';
import passport from 'passport';
import common from '../../../lib/middlewares/common';
import { getToken } from '../../../lib/utils/authHelpers';
import { onError, onNoMatch } from '../../../lib/utils/ncHandlers';


const handler = nc({ onNoMatch: onNoMatch, onError: onError });

handler.use(common)

handler
  .get((req, res) => {
    passport.authenticate('jwt')(req, res, () => {
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