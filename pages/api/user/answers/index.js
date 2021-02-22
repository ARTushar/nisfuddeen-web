import verifyUser from "../../../../lib/middlewares/verifyUser";
import { createNC } from "../../../../lib/utils/ncHandlers";

const handler = createNC();

handler
  .get(verifyUser, (req, res, next) => {

  })
  .post(verifyUser, (req, res, next) => {

  })
  .put(verifyUser, (req, res, next) => {

  })
  .delete(verifyUser, (req, res, next) => {

  });

export default handler;