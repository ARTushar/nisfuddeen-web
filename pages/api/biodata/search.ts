import { createNC } from "../../../lib/utils/ncHandlers";
import createValidation from '../../../lib/middlewares/validate';
import queryBiodata from '../../../lib/validations/queryBiodata';
import { createBadRequestError } from '../../../lib/utils/errorCreators';
import verifyUser from '../../../lib/middlewares/verifyUser';
import verifyPremiumUser from '../../../lib/middlewares/verifyPremiumUser';
import ShortBiodata from '../../../lib/models/biodata/ShortBiodata';
import { debug } from '../../../lib/utils/helpers';

const handler = createNC();
const queryValidation = createValidation(queryBiodata, 'query');


handler
  .get(parseQueryParams, queryAccess, queryValidation, async (req, res, next) => {
      try {
          debug('biodata search started!', req.query)
          const biodatas = await ShortBiodata.fetchUserBiodatas(req.query);
          res.status(200).json(biodatas);
      } catch (error) {
          next(error) ;
      }
  });

export default handler;

function parseQueryParams(req, res, next) {
    debug('before parsing', req.query);
    try {
        if(req.query.lastKey) req.query.lastKey = JSON.parse(req.query.lastKey);
        if(req.query.outfit) req.query.outfit = JSON.parse(req.query.outfit);
    } catch (e) {
        debug('parse query parameters', e);
        return next(createBadRequestError('invalid query params. check lastKey or outfit'));
    }
    return next();
}

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
            return verifyUser(req, res, (e) => {
                if(e) {
                    next(e);
                } else {
                    verifyPremiumUser(req, res, next)
                }
            });
        case undefined:
            return next(createBadRequestError('queryType required'))
        default:
            return next(createBadRequestError('Invalid Query type'));
    }
}
