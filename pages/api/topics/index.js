import verifyAdmin from "../../../lib/middlewares/vefiyAdmin";
import verifyUser from "../../../lib/middlewares/verifyUser";
import { createNC } from "../../../lib/utils/ncHandlers";

const handler = createNC();

handler
  .get((req, res, next) => {

  })
  .post(verifyUser, verifyAdmin, (req, res, next) => {

  });

export default handler;