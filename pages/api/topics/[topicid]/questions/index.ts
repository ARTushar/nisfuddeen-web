import verifyAdmin from "../../../../../lib/middlewares/vefiyAdmin";
// import verifyUser from "../../../../../lib/middlewares/verifyUser";
// import { addQuestion, fetchQuestions } from "../../../../../lib/utils/databaseInterection";
import { createNC } from "../../../../../lib/utils/ncHandlers";

const handler = createNC();
//
// handler
//   .get(async (req, res, next) => {
//     try {
//       const questions = await fetchQuestions(req.query.topicid);
//       res.status(200).json(questions);
//     } catch (error) {
//       next(error);
//     }
//   })
//   .post(verifyUser, verifyAdmin, async (req, res, next) => {
//     try {
//       const questions = await addQuestion(req.query.topicid, req.body);
//       res.status(200).json(questions);
//     } catch (error) {
//       next(error);
//     }
//   });

export default handler;