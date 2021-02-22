import verifyModeratorOrAdmin from "../../../../lib/middlewares/verifyModeratorOrAdmin";
import verifyUser from "../../../../lib/middlewares/verifyUser";
import { createNC } from "../../../../lib/utils/ncHandlers";

const handler = createNC();

handler
  .post(verifyUser, verifyModeratorOrAdmin, (req, res, next) => {

  });

export default handler;