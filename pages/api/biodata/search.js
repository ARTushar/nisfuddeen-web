import { fetchBiodatas } from "../../../lib/utils/databaseInterection";
import { createNC } from "../../../lib/utils/ncHandlers";

const handler = createNC();

handler
  .get((req, res, next) => {
    try {
      const biodatas = await fetchBiodatas(req.query);
      res.status(200).json(biodatas);
    } catch (error) {
      next(error) ;
    }
  });

export default handler;