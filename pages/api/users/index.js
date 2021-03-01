import verifyModeratorOrAdmin from "../../../lib/middlewares/verifyModeratorOrAdmin";
import verifyUser from "../../../lib/middlewares/verifyUser";
import { fetchUsers } from "../../../lib/utils/databaseInterection";
import { createNC } from "../../../lib/utils/ncHandlers";

const handler = createNC();

handler
  .get(verifyUser, verifyModeratorOrAdmin, (req, res, next) => {
    try {
      const users = await fetchUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  });

export default handler;