import User from "../models/User";
import { createError } from "./ncHandlers";

export const titleCase = (name) =>
  name
    .trim()
    .toLowerCase()
    .split(/[ \t]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const addCountryCode = (num) => {
  if (num.search(/^[+]880[0-9]{10}/) !== -1) {
    return num;
  } else if (num.search(/^880[0-9]{10}/) !== -1) {
    return "+" + num;
  } else if (num.search(/^0[0-9]{10}/) !== -1) {
    // console.log(num);
    return "+88" + num;
  } else {
    return num;
  }
}

export const homeUserFields = 'maritalStatus height occupation gender birthYear prayerTimes veilStyle';

export const restrictedUserFields = '-__v -salt -hash -googleId -createdAt -updatedAt';

export function filterSensitiveUserFields(user) {
  const filteredUser = JSON.parse(JSON.stringify(user));
  if (filteredUser.salt) delete filteredUser.salt;
  if (filteredUser.hash) delete filteredUser.hash;
  if (filteredUser.googleId) delete filteredUser.googleId;
  if (filteredUser.createdAt) delete filteredUser.createdAt;
  if (filteredUser.updatedAt) delete filteredUser.updatedAt;
  return filteredUser;
};

export async function saveUserFields(user, body) {
  if(!body) throw createError(404, 'body not found');

  if (body.name) user.name = body.name;
  if (body.email) user.email = body.email;
  if (body.maritalStatus) user.maritalStatus = body.maritalStatus;
  if (body.height) user.height = body.height;
  if (body.weight) user.weight = body.weight;
  if (body.occupation) user.occupation = body.occupation;
  if (body.gender) user.gender = body.gender;
  if (body.birthYear) user.birthYear = body.birthYear;
  if (body.prayerTimes) user.prayerTimes = body.prayerTimes;
  if (body.veilStyle) user.veilStyle = body.veilStyle;
  if (body.presentAddress) {
    if (body.presentAddress.country) {
      user.presentAddress.country = body.presentAddress.country;
    }
    if (body.presentAddress.district) {
      user.presentAddress.district = body.presentAddress.district;
    }
    if (body.presentAddress.division) {
      user.presentAddress.division = body.presentAddress.division;
    }
    if (body.presentAddress.postOffice) {
      user.presentAddress.postOffice = body.presentAddress.postOffice;
    }
  }
  if (body.permanentAddress) {
    if (body.permanentAddress.country) {
      user.permanentAddress.country = body.permanentAddress.country;
    }
    if (body.permanentAddress.district) {
      user.permanentAddress.district = body.permanentAddress.district;
    }
    if (body.permanentAddress.division) {
      user.permanentAddress.division = body.permanentAddress.division;
    }
    if (body.permanentAddress.postOffice) {
      user.permanentAddress.postOffice = body.permanentAddress.postOffice;
    }
  }
  try {
    return await user.save();
  } catch (error) {
    throw error;
  }
}


export async function fetchUserInformation(userId) {
  try {
  return await User.findById(userId, restrictedUserFields)
  } catch (error) {
    throw error;  
  }
}
