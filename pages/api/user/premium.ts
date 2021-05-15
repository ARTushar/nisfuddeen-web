import verifyUser from "../../../lib/middlewares/verifyUser";
import { createNC } from "../../../lib/utils/ncHandlers";
import User from '../../../lib/models/user/User';
import { debug } from '../../../lib/utils/helpers';
import { createBadRequestError } from '../../../lib/utils/errorCreators';

const handler = createNC();

handler
  .post(verifyUser, async (req, res, next) => {
      try {
          let user = await User.updateUser({
              id: req.user.id,
              subscriptionType: 'premium'
          });
          if(!user) return next(createBadRequestError('Already premium'));
          debug('make premium user', user);
          res.status(200).json(user);
      } catch (error) {
          next(error);
      }
  });

export default handler;