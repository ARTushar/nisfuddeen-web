import Biodata from '../../../lib/models/biodata/Biodata';
import { createNC } from '../../../lib/utils/ncHandlers';
import verifyUser from '../../../lib/middlewares/verifyUser';
import getBiodataSubmitSchema from '../../../lib/validations/biodataSubmit';
import createValidation from '../../../lib/middlewares/validate';
import getBiodataUpdateSchema from '../../../lib/validations/biodataUpdate';
import { createNotFoundError } from '../../../lib/utils/errorCreators';

const handler = createNC();

function biodataSubmitValidation(req, res, next) {
  let schema;
  if (req.user.gender === 'male') schema = getBiodataSubmitSchema('male');
  else schema = getBiodataSubmitSchema('female');

  const validation = createValidation(schema, 'body');
  return validation(req, res, next);
}

function biodataUpdateValidation(req, res, next) {
  let schema;
  if (req.user.gender === 'male') schema = getBiodataUpdateSchema('male');
  else schema = getBiodataUpdateSchema('female');

  const validation = createValidation(schema, 'body');
  return validation(req, res, next);
}

handler
  .get(verifyUser,  async (req, res, next) => {
    try {
      if(!req.user.biodataSubmitted) return next(createNotFoundError('Biodata Not found'));
      const biodata = await Biodata.getBiodataByUserId(req.user.id);
      res.status(200).json(biodata);
    } catch (error) {
      next(error);
    }
  })
  .post(verifyUser, biodataSubmitValidation, async (req, res, next) => {
    try {
      const biodata = await Biodata.createBiodata(req.user.id, req.body)
      res.status(200).json(biodata);
    } catch (error) {
      next(error)
    }
  })
  .put(verifyUser, biodataUpdateValidation, async (req, res, next) => {
    try {
      if(!req.user.biodataSubmitted) return next(createNotFoundError('Biodata Not found'));
      const updatedBiodata = await Biodata.updateBiodata(req.user.id, req.body, req.user.gender);
      res.status(200).json(updatedBiodata);
    } catch (error) {
      next(error);
    }
  })
  .delete(verifyUser, async (req, res, next) => {
    try {
      if(!req.user.biodataSubmitted) return next(createNotFoundError('Biodata Not found'));
      const removed = await Biodata.deleteBiodata(req.user.id);
      res.status(200).json({ removed });
    } catch (error) {
      next(error);
    }
  });

export default handler;
