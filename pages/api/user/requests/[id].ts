import verifyUser from "../../../../lib/middlewares/verifyUser";
import Request from '../../../../lib/models/profile/Request';
import { createNC } from "../../../../lib/utils/ncHandlers";
import createValidation from '../../../../lib/middlewares/validate';
import requestId from '../../../../lib/validations/idCheck';
import updateRequestStatus from '../../../../lib/validations/updateRequestStatus';
import { createBadRequestError } from '../../../../lib/utils/errorCreators';

const handler = createNC();
const requestIdValidation = createValidation(requestId, 'query');
const updateRequestValidation = createValidation(updateRequestStatus, 'body');

handler
  .put(verifyUser, requestIdValidation, updateRequestValidation, async (req, res, next) => {
      try {
          const changed = await Request.updateStatus(req.query.id, req.user.id, req.body.status);
          if(!changed) return next(createBadRequestError('Invalid ID'));
          res.status(200).json({ changed: changed });
      } catch (error) {
          next(error);
      }
  })
  .delete(verifyUser, requestIdValidation, async (req, res, next) => {
      try {
          const deleted = await Request.deleteRequest(req.user.id, req.query.id);
          if(!deleted) return next(createBadRequestError('Invalid ID'));
          res.status(200).json({ deleted });
      } catch (error) {
          next(error);
      }
  });

export default handler;
