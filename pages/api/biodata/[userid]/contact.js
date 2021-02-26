import verifyPremiumUser from "../../../../lib/middlewares/verifyPremiumUser";
import verifyUser from "../../../../lib/middlewares/verifyUser";
import { createNC } from "../../../../lib/utils/ncHandlers";

const handler = createNC();

handler
  .post(verifyUser, verifyPremiumUser, (req, res, next) => {

  });

export default handler;