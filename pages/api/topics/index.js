import verifyAdmin from "../../../lib/middlewares/vefiyAdmin";
import verifyUser from "../../../lib/middlewares/verifyUser";
import { addTopic, fetchTopics } from "../../../lib/utils/databaseInterection";
import { createNC } from "../../../lib/utils/ncHandlers";

const handler = createNC();

handler
  .get((req, res, next) => {
    try {
      const topics = await fetchTopics();
      res.status(200).json(topics);
    } catch (error) {
      next(error);
    }
  })
  .post(verifyUser, verifyAdmin, (req, res, next) => {
    try {
      const topics = await addTopic(req.body);
      res.status(200).json(topics);
    } catch (error) {
      next(error);
    }
  });

export default handler;