import { createNC } from '../../../lib/utils/ncHandlers';
import verifyUser from '../../../lib/middlewares/verifyUser';

const handler = createNC();

handler
  .get(verifyUser, async (req, res, next) => {

      // const idToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNkOWNmYWE4OGVmMDViNDI0YmU2MjA1ZjQ2YjE4OGQ3MzI1N2JjNDIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTWVoZGkgSGFzc2FuIEFrYXNoIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdnbzRwdVR0T1JzdGVtbGNoUkpZbGwtZGhHMW1RVXZSWUFtOVRubkl3PXM5Ni1jI'
      res.status(200).json(req.user);
  });

export default handler;



