import verifyAdmin from "../../../../lib/middlewares/vefiyAdmin";
import verifyUser from "../../../../lib/middlewares/verifyUser";
import { fetchTopicDetails, removeTopic, updateTopic } from "../../../../lib/utils/databaseInterection";
import { createNC } from "../../../../lib/utils/ncHandlers";

const handler = createNC();

handler
  .get(async (req, res, next) => {
    try {
      const topic = await fetchTopicDetails(req.query.topicid);
      res.status(200).json(topic);
    } catch (error) {
      next(error);
    }
  })
  .put(verifyUser, verifyAdmin, async (req, res, next) => {
    try {
      const topic = await updateTopic(req.query.topicid, req.body);
      res.status(200).json(topic);
    } catch (error) {
      next(error);
    }
  })
  .delete(verifyUser, verifyAdmin, async (req, res, next) => {
    try {
      const resp = await removeTopic(req.query.topicid);
      res.status(200).json(resp);
    } catch (error) {
      next(error);
    }
  });

export default handler;