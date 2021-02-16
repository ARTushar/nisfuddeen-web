import User from '../../../lib/models/User';
import nc from 'next-connect';
import common from '../../../lib/middlewares/common';
import { onNoMatch } from '../../../lib/utils/errorHandler';
import passport from 'passport';
import { createNewUser } from '../../../lib/utils/authHelpers';

const handler = nc(onNoMatch);
handler.use(common);

handler
  .post(async (req, res) => {
    try {
      await createNewUser(req.body.name, req.body.email, req.body.password);
      // const { user } = await User.authenticate()(req.body.email, req.body.password)
      passport.authenticate('local')(req, res, () => {
        console.log(req.user);
        res.status(200).json({ success: true });
      })
    } catch (err) {
      res.status(500).json({ err: err, errMess: err.message });
    }
  });

export default handler;