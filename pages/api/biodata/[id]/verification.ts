import verifyModeratorOrAdmin from "../../../../lib/middlewares/verifyModeratorOrAdmin";
import verifyUser from "../../../../lib/middlewares/verifyUser";
import { createNC } from "../../../../lib/utils/ncHandlers";
import Biodata from '../../../../lib/models/biodata/Biodata';

const handler = createNC();

handler
  .post(verifyUser, verifyModeratorOrAdmin, async (req, res, next) => {
      try {
          const user = await Biodata.updateBiodata(req.body.userid,
            new Biodata({
                verified: true
            }), req.body.gender
          );
          res.status(200).json(user);
      } catch (error) {
          next(error);
      }
  });

export default handler;