import verifyPremiumUser from "../../../../lib/middlewares/verifyPremiumUser";
import verifyUser from "../../../../lib/middlewares/verifyUser";
import { fetchUserLinks, linkUser } from "../../../../lib/utils/databaseInterection";
import { createNC } from "../../../../lib/utils/ncHandlers";

const handler = createNC();

handler
  .get(verifyUser, verifyPremiumUser, async (req, res, next) => {
    try {
      const links = await fetchUserLinks(req.user._id);
      res.status(200).json(links);
    } catch (err) {
      next(err);
    }
  })
  .post(verifyUser, verifyPremiumUser, async (req, res, next) => {
    try {
      const added = await linkUser(req.user._id, req.body);
      res.status(200).json(added);
    } catch (err) {
      next(err);
    }
  });

export default handler;