import verifyUser from "../../../../lib/middlewares/verifyUser";
import Request from '../../../../lib/models/profile/Request';
import { createNC } from "../../../../lib/utils/ncHandlers";
import createValidation from '../../../../lib/middlewares/validate';
import typeRequest from '../../../../lib/validations/requestType';
import { createBadRequestError } from '../../../../lib/utils/errorCreators';
import idCheck from '../../../../lib/validations/idCheck';

const handler = createNC();
const typeRequestValidation = createValidation(typeRequest, 'query');
const idCheckValidation = createValidation(idCheck, 'body');

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
  .post(verifyUser, idCheckValidation,  async  (req, res, next) => {
      try {
          const request = await Request.createRequest(req.user.id, req.body.id);
          if(!request) return next(createBadRequestError('Invalid ID'));
          res.status(200).json({request});
      } catch (e) {
          next(e);
      }
  });

export default handler;
