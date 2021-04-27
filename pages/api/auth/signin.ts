// import passport from 'passport';
// import { getToken } from '../../../lib/utils/authHelpers';
import { createNC } from '../../../lib/utils/ncHandlers';

const handler = createNC();

handler
  .post((req, res) => {
    // passport.authenticate('local')(req, res, () => {
    //   const token = getToken(req.user);
    //   const refreshToken = getToken(req.user, 'refresh');
    //   res.status(200).json({
    //     success: true,
    //     token,
    //     refreshToken
    //   })
    // })
  });

export default handler;