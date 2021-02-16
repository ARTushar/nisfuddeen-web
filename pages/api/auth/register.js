import nc from 'next-connect';
import common from '../../../lib/middlewares/common';
import passport from 'passport';
import { createNewUser } from '../../../lib/utils/authHelpers';
import next from 'next';
import { createError, onError, onNoMatch } from '../../../lib/utils/ncHandlers';

const handler = nc({onNoMatch, onError});
handler.use(common);

handler
  .post(async (req, res, next) => {
    try {
      await createNewUser(req.body.name, req.body.email, req.body.password);
      // const { user } = await User.authenticate()(req.body.email, req.body.password)
      passport.authenticate('local')(req, res, () => {
        console.log(req.user);
        res.status(200).json({ success: true });
      })
    } catch (err) {
      // res.status(500).json({ err: err, errMess: err.message });
      next(createError(500, err.message));
    }
  });

export default handler;