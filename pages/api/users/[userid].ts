import verifyModeratorOrAdmin from "../../../lib/middlewares/verifyModeratorOrAdmin";
// import verifyUser from "../../../lib/middlewares/verifyUser";
// import { fetchUserDetailAdmin } from "../../../lib/utils/databaseInterection";
import { createNC } from "../../../lib/utils/ncHandlers";

const handler = createNC();

// handler
//   .get(verifyUser, verifyModeratorOrAdmin, async (req, res, next) => {
//     try {
//       const user = await fetchUserDetailAdmin(req.query.userid);
//       res.status(200).json(user);
//     } catch (error) {
//       next(error);
//     }
//   });

export default handler;