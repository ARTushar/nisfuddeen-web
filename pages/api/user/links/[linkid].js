import verifyPremiumUser from "../../../../lib/middlewares/verifyPremiumUser";
import verifyUser from "../../../../lib/middlewares/verifyUser";
import { unlinkUser } from "../../../../lib/utils/databaseInterection";
import { createNC } from "../../../../lib/utils/ncHandlers";

const handler = createNC();

handler
  .delete(verifyUser, verifyPremiumUser, async (req, res, next) => {
    try {
      const removed = await unlinkUser(req.user._id, req.query.linkid);
      res.status(200).json({removed: removed});
    } catch (error) {
      next(error);
    }
  });

export default handler;