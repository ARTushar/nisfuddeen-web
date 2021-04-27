import verifyPremiumUser from "../../../../lib/middlewares/verifyPremiumUser";
// import verifyUser from "../../../../lib/middlewares/verifyUser";
// import { fetchUserWishlist } from "../../../../lib/utils/databaseInterection";
import { createNC } from "../../../../lib/utils/ncHandlers";

const handler = createNC();
//
// handler
//   .get(verifyUser, verifyPremiumUser, async (req, res, next) => {
//     try {
//       const wishList = await fetchUserWishlist(req.user._id);
//       req.status(200).json(wishList);
//     } catch (error) {
//       next(error);
//     }
//   })

export default handler;