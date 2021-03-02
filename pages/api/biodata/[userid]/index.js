import { fetchBiodataDetails } from "../../../../lib/utils/databaseInterection";
import { createNC } from "../../../../lib/utils/ncHandlers";

const handler = createNC();

handler
  .get((req, res, next) => {
    try {
      const biodata = await fetchBiodataDetails(req.query.userid);
      res.status(200).json(biodata);
    } catch (error) {
      next(error);
    }
  });

export default handler;