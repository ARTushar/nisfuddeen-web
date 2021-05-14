import verifyUser from "../../../lib/middlewares/verifyUser";
import Request from '../../../lib/models/profile/Request';
import { createNC } from "../../../lib/utils/ncHandlers";
import updateRequestStatus from '../../../lib/validations/updateRequestStatus';
import createValidation from '../../../lib/middlewares/validate';

const handler = createNC();
const updateRequestValidation = createValidation(updateRequestStatus, ['body']);

handler
  .get(verifyUser, async (req, res, next) => {
      try {
          const requests = await Request.getReceivedRequests(req.user.id);
          res.status(200).json(requests);
      } catch (e) {
          next(e)
      }
  })
  .put(verifyUser, updateRequestValidation, async (req, res, next) => {
      try {
          const changed = await Request.updateStatus(req.body.id, req.user.id, req.body.status);
          res.status(200).json({ changed: changed });
      } catch (error) {
          next(error);
      }
  });

export default handler;