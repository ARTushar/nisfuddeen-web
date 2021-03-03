import verifyAdmin from "../../../../../lib/middlewares/vefiyAdmin";
import verifyUser from "../../../../../lib/middlewares/verifyUser";
import { fetchAQuestion, removeQuestion, updateQuestion } from "../../../../../lib/utils/databaseInterection";
import { createNC } from "../../../../../lib/utils/ncHandlers";

const handler = createNC();

handler
  .get(async (req, res, next) => {
    try {
      const question = await fetchAQuestion(req.query.topicid, req.query.questionid);
      req.status(200).json(question);
    } catch (error) {
      next(error);
    }
  })
  .put(verifyUser, verifyAdmin, async (req, res, next) => {
    try {
      const question = await updateQuestion(req.query.topicid, req.query.questionid, req.body);
      res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  })
  .delete(verifyUser, verifyAdmin, async (req, res, next) => {
    try {
      const question = await removeQuestion(req.query.topicid, req.query.questionid);
      res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  });

export default handler;