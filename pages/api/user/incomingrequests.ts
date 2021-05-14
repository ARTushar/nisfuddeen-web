import verifyUser from "../../../lib/middlewares/verifyUser";
import Request from '../../../lib/models/profile/Request';
import { createNC } from "../../../lib/utils/ncHandlers";
import updateRequestStatus from '../../../lib/validations/updateRequestStatus';
import createValidation from '../../../lib/middlewares/validate';

const handler = createNC();

handler

export default handler;