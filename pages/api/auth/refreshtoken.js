import passport from 'passport';
import { getToken } from '../../../lib/utils/authHelpers';
import { createNC } from '../../../lib/utils/ncHandlers';

const handler = createNC();

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