import verifyPremiumUser from "../../../../lib/middlewares/verifyPremiumUser";
import verifyUser from "../../../../lib/middlewares/verifyUser";
import { requestContact } from "../../../../lib/utils/databaseInterection";
import { createNC } from "../../../../lib/utils/ncHandlers";

const handler = createNC();

handler
  .post(verifyUser, verifyPremiumUser, (req, res, next) => {
    try {
      const requested = await requestContact(req.user._id, req.query.userid);
      res.status(200).json({requested});
    } catch (error) {
      next(error);
    }
  });

export default handler;