import passport from 'passport';
import { createNewUser } from '../../../lib/utils/authHelpers';
import { createError, createNC } from '../../../lib/utils/ncHandlers';

const handler = createNC();

handler
  .post(async (req, res, next) => {
    try {
      await createNewUser(req.body.name, req.body.email, req.body.password, req.body.accountType);
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