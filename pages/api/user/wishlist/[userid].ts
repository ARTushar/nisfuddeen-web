import verifyPremiumUser from "../../../../lib/middlewares/verifyPremiumUser";
// import verifyUser from "../../../../lib/middlewares/verifyUser";
// import { appendUserInWishlist, deleteUserFromWishlist } from "../../../../lib/utils/databaseInterection";
import { createNC } from "../../../../lib/utils/ncHandlers";

const handler = createNC();

// handler
//   .post(verifyUser, verifyPremiumUser, async (req, res, next) => {
//     try {
//       const added = await appendUserInWishlist(req.user._id, req.query.userid);
//       res.status(200).json({ success: added })
//     } catch (err) {
//       next(err);
//     }
//   })
//   .delete(verifyUser, verifyPremiumUser, async (req, res, next) => {
//     try {
//       const removed = await deleteUserFromWishlist(req.user._id, req.query.userid);
//       res.status(200).json({ success: removed })
//     } catch (err) {
//       next(err);
//     }
//   });

export default handler;