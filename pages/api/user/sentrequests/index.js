import verifyPremiumUser from "../../../../lib/middlewares/verifyPremiumUser";
import verifyUser from "../../../../lib/middlewares/verifyUser";
import { fetchSentRequests } from "../../../../lib/utils/databaseInterection";
import { createNC } from "../../../../lib/utils/ncHandlers";

const handler = createNC();

handler
  .get(verifyUser, verifyPremiumUser, (req, res, next) => {
    try {
      const requests = await fetchSentRequests(req.user._id);
      res.json(200).status(requests);
    } catch (error) {
      next(error);
    }
  });

export default handler;