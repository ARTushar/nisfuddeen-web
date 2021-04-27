// import verifyUser from "../../../../lib/middlewares/verifyUser";
// import { changeRequestStatus } from "../../../../lib/utils/databaseInterection";
import { createNC } from "../../../../lib/utils/ncHandlers";

const handler = createNC();

// handler
//   .put(verifyUser, async (req, res, next) => {
//     try {
//       const changed = await changeRequestStatus(req.query.requestId, req.body);
//       res.status(200).json({ changed: changed });
//     } catch (error) {
//       next(error);
//     }
//   });

export default handler;