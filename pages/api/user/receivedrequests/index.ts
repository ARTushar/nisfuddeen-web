import verifyUser from "../../../../lib/middlewares/verifyUser";
import { fetchReceivedRequests } from "../../../../lib/utils/databaseInterection";
import { createNC } from "../../../../lib/utils/ncHandlers";

const handler = createNC();

handler
  .get(verifyUser, async (req, res, next) => {
    try {
      const requests = await fetchReceivedRequests(req.user._id);
      res.status(200).json(requests);
    } catch (error) {
      next(error);
    }
  });

export default handler;