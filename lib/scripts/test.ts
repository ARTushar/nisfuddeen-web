#!/usr/bin/env ts-node

import admin from 'firebase-admin';

const serviceAccount = require('../../lib/config/nisfuddeen-firebase-admins.json');

const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}): admin.app()

const idToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNkOWNmYWE4OGVmMDViNDI0YmU2MjA1ZjQ2YjE4OGQ3MzI1N2JjNDIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTWVoZGkgSGFzc2FuIEFrYXNoIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdnbzRwdVR0T1JzdGVtbGNoUkpZbGwtZGhHMW1RVXZSWUFtOVRubkl3PXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL25pc2Z1ZGRlZW4iLCJhdWQiOiJuaXNmdWRkZWVuIiwiYXV0aF90aW1lIjoxNjIyMTM3NTU4LCJ1c2VyX2lkIjoid0QzUzFTdWRieWQ3c1N1YWNHYll0cEY4VUJCMyIsInN1YiI6IndEM1MxU3VkYnlkN3NTdWFjR2JZdHBGOFVCQjMiLCJpYXQiOjE2MjIxMzc1NTgsImV4cCI6MTYyMjE0MTE1OCwiZW1haWwiOiJtaGFrYXNoMjExOTk4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAwMTkxNTkwOTUyMjUxMTM0MzkwIl0sImVtYWlsIjpbIm1oYWthc2gyMTE5OThAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.qu-xwOzZ98Xsui92ABOttP92SCzWZ72rUWSK1CC94DGKeLKDQjqQpai724I6dSABvZ-_pcisThx8whEItj-o-xfW5KNAixZEyJXJP1NMUDhGxI6Yr1rfFDVN1GFDbXwGOAWQ9tUq_Ske9HXg06CWe6g0PEwiTdPVxPkqJ4HkIMl6kqKfrZ57ar4OG9cTjNcsU67C5hI0NaIVQMpt0NJwj7m9G7tQgt02VmUS4ztb52MXbIRaEUlVGEFeaTizsgznA9pgJSbKvbWE6ksU0G7HRIpLc1-NcfsoR6SNk-mNMrdIUuFFL6OGkUgDV1m3V_5RmevFtqNxoQwxRdNXyAmUXg'

admin
  .auth()
  .verifyIdToken(idToken)
  .then((decodedToken) => {
      console.log("Decoded Token ", decodedToken);
      const uid = decodedToken.uid;
      console.log('UID: ', uid);
      // ...
  })
  .catch((error) => {
      console.log(error);
      // Handle error
  });
