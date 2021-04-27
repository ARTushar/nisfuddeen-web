// import verifyUser from "../../../lib/middlewares/verifyUser";
// import { filterSensitiveUserFields, makePremium } from "../../../lib/utils/databaseInterection";
import { createNC } from "../../../lib/utils/ncHandlers";

const handler = createNC();

// handler
  // .post(verifyUser, async (req, res, next) => {
  //   try {
  //     let user = await makePremium(req.query.userid);
  //     user = filterSensitiveUserFields(user);
  //     res.status(200).json(user);
  //   } catch (error) {
  //     next(error);
  //   }
  // });

export default handler;