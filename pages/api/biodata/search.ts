import { createNC } from "../../../lib/utils/ncHandlers";
import createValidation from '../../../lib/middlewares/validate';
import queryBiodata from '../../../lib/validations/queryBiodata';
import { createBadRequestError } from '../../../lib/utils/errorCreators';
import verifyUser from '../../../lib/middlewares/verifyUser';
import verifyPremiumUser from '../../../lib/middlewares/verifyPremiumUser';
import ShortBiodata from '../../../lib/models/biodata/ShortBiodata';

const handler = createNC();
const queryValidation = createValidation(queryBiodata, 'query');

async function queryAccess(req, res, next) {
    switch (req.query.queryType) {
        case '1':
        case '3m':
        case '3f':
            return next();
        case '2':
        case '4m':
        case '4f':
        case '5':
        case '6':
            await verifyUser(req, res, next)
            return verifyPremiumUser(req, res, next)
        default:
            return next(createBadRequestError('Invalid Query type'));
    }
}

handler
  .get(queryAccess, queryValidation, async (req, res, next) => {
      try {
          const biodatas = await ShortBiodata.fetchUserBiodatas(req.query);
          res.status(200).json(biodatas);
      } catch (error) {
          next(error) ;
      }
  });

export default handler;