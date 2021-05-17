import { createNC } from "../../../../lib/utils/ncHandlers";
import Biodata from '../../../../lib/models/biodata/Biodata';
import createValidation from '../../../../lib/middlewares/validate';
import idCheck from '../../../../lib/validations/idCheck';
import { debug } from '../../../../lib/utils/helpers';

const handler = createNC();
const idValidation = createValidation(idCheck, 'query');

handler
  .get(idValidation, async (req, res, next) => {
    try {
        debug('fetch biodata details');
      const biodata = await Biodata.getBiodataPubliclyByUserId(req.query.id);
      res.status(200).json(biodata);
    } catch (error) {
      next(error);
    }
  });

export default handler;