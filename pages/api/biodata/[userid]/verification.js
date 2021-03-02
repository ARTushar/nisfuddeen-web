import verifyModeratorOrAdmin from "../../../../lib/middlewares/verifyModeratorOrAdmin";
import verifyUser from "../../../../lib/middlewares/verifyUser";
import { verifyBiodata } from "../../../../lib/utils/databaseInterection";
import { createNC } from "../../../../lib/utils/ncHandlers";

const handler = createNC();

handler
  .post(verifyUser, verifyModeratorOrAdmin, (req, res, next) => {
    try {
      const user = await verifyBiodata(req.query.userid);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  });

export default handler;