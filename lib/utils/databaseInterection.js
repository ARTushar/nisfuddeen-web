import { serializeUser } from "passport";
import { restrictedUserFields } from "../constants/databseConstants";
import User from "../models/User";
import UserDetail from '../models/UserDetail';
import { createNotFoundError, createServerError } from "./errorCreators";



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
  if(!body) throw createNotFoundError('Body Not Found');

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
    throw createServerError(error.message);
  }
}


export async function fetchUserInformation(userId) {
  try {
    const user = await User.findById(userId, restrictedUserFields);
    if (!user) throw createNotFoundError('User Not Found');
    return user;
  } catch (error) {
    throw createServerError(error.message);
  }
}

export async function fetchUserWishlist(userId) {
  try {
    const user = await UserDetail.findOne({ userId: userId }, 'wishList')
      .populate('wishList', homeUserFields);
    if(!user) throw createNotFoundError('User Not Found');
    return user;
  } catch (error) {
    throw createServerError(error.message);
  }
}

export async function findUser(userId) {
  try {
    const user =  await User.findById(userId, '_id');
    if(!user) throw createNotFoundError('User Not Found');
    return user;
  } catch (error) {
    throw createServerError(error.message);
  }
}

export async function appendUserInWishlist(userId, targetUserId) {
  try {
    const user = await UserDetail.findOne({ userId: userId }, 'wishList')
    if(!user) throw createNotFoundError('User Not Found');
    user.wishList.push(targetUserId);
    await user.save();
    return true;
  } catch (err) {
    throw createServerError(err.message);
  }
}

export async function deleteUserFromWishlist(userId, targetUserId) {
  try {
    const user = await UserDetail.findOne({ userId: userId }, 'wishList')
    if (!user) throw createNotFoundError('User Not Found');
    let temp = -1;
    if (user.wishList) {
      temp = user.wishList.indexOf(targetUserId);
      user.wishList.pull(targetUserId);
    }
    if (temp == -1) throw createNotFoundError('user not found');
    await user.save();
    return true;
  } catch (err) {
    throw createServerError(err.message);
  }

}