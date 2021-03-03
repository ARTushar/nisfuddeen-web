import verifyUser from "../../../../lib/middlewares/verifyUser";
import { fetchAnswers, submitBiodata, updateBiodata, invisibleBiodata } from "../../../../lib/utils/databaseInterection";
import { createNC } from "../../../../lib/utils/ncHandlers";

const handler = createNC();

handler
  .get(verifyUser, async (req, res, next) => {
    try {
      const answers = fetchAnswers(req.user._id);
      res.status(200).json(answers);
    } catch (error) {
      next(error);
    }
  })
  .post(verifyUser, async (req, res, next) => {
    try {
      const biodata = await submitBiodata(req.user._id, req.body) 
      res.status(200).json(biodata);
    } catch (error) {
      next(error)
    }
  })
  .put(verifyUser, async (req, res, next) => {
    try {
      const updatedBiodata = await updateBiodata(req.user._id, req.body);
      res.status(200).json(updatedBiodata);
    } catch (error) {
      next(error);
    }
  })
  .delete(verifyUser, async (req, res, next) => {
    try {
      const removed = await invisibleBiodata(req.user._id);
      res.status(200).json({ removed: removed });
    } catch (error) {
      next(error);
    }
  });

export default handler;