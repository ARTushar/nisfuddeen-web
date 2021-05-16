import verifyModeratorOrAdmin from "../../../lib/middlewares/verifyModeratorOrAdmin";
// import verifyUser from "../../../lib/middlewares/verifyUser";
import { createNC } from "../../../lib/utils/ncHandlers";

const handler = createNC();

// handler
//   .get(verifyUser, verifyModeratorOrAdmin, async (req, res, next) => {
//     try {
//       const users = await fetchUsers();
//       res.status(200).json(users);
//     } catch (error) {
//       next(error);
//     }
//   });

export default handler;