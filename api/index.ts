import axios from 'axios'
// import Cookies from 'js-cookie'
// import {getSession, getCsrfToken} from 'next-auth/client'

export const BASE_URL = 'http://127.0.0.1:3000/api'

// const 

export const registerUser = async (data) => {
  try {
    const res = await  axios.post(`${BASE_URL}/auth/register`, {
      ...data,
    })
    // console.log('response', res);
    return res;
  }
  catch(err){
    // console.log(err)
    return err;
  }
}

// const createBiodata = async()