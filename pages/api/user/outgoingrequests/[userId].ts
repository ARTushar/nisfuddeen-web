import verifyUser from "../../../../lib/middlewares/verifyUser";
import Request from '../../../../lib/models/profile/Request';
import { createNC } from "../../../../lib/utils/ncHandlers";
import createValidation from '../../../../lib/middlewares/validate';
import deleteRequest from '../../../../lib/validations/deleteRequest';

const handler = createNC();
const deleteRequestValidation = createValidation(deleteRequest, ['query']);

handler
  .get(verifyUser, async (req, res, next) => {
      try {
          const requests = await Request.getSentRequests(req.user.id);
          res.status(200).json(requests);
      } catch (e) {
          next(e)
      }
  })
  .delete(verifyUser, deleteRequestValidation, async (req, res, next) => {
      try {
          const deleted = await Request.deleteRequest(req.user.id, req.query.userId);
          res.status(200).json({ deleted });
      } catch (error) {
          next(error);
      }
  });

export default handler;
