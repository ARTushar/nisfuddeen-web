import verifyUser from "../../../../lib/middlewares/verifyUser";
import Request from '../../../../lib/models/profile/Request';
import { createNC } from "../../../../lib/utils/ncHandlers";
import createValidation from '../../../../lib/middlewares/validate';
import deleteRequest from '../../../../lib/validations/idCheck';
import typeRequest from '../../../../lib/validations/requestType';

const handler = createNC();
const typeRequestValidation = createValidation(typeRequest, 'query');

handler
  .get(verifyUser, typeRequestValidation, async (req, res, next) => {
      try {
          const requests = req.query.type === 'outgoing'?
            await Request.getSentRequests(req.user.id):
            await Request.getReceivedRequests(req.user.id);
          res.status(200).json(requests);
      } catch (e) {
          next(e)
      }
  })

export default handler;
