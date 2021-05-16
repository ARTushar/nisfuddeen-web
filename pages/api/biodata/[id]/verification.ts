import verifyModeratorOrAdmin from "../../../../lib/middlewares/verifyModeratorOrAdmin";
import verifyUser from "../../../../lib/middlewares/verifyUser";
import { createNC } from "../../../../lib/utils/ncHandlers";
import Biodata from '../../../../lib/models/biodata/Biodata';
import createValidation from '../../../../lib/middlewares/validate';
import verifyBiodata from '../../../../lib/validations/verifyBiodata';

const handler = createNC();
const verifyBiodataValidation = createValidation(verifyBiodata, 'body');

handler
  .post(verifyUser, verifyModeratorOrAdmin, verifyBiodataValidation, async (req, res, next) => {
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