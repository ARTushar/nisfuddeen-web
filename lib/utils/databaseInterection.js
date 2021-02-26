import mongoose, { mongo } from "mongoose";
import { restrictedUserFields } from "../constants/databseConstants";
import ContactRequest from "../models/ContactRequest";
import User from "../models/User";
import UserDetail from '../models/UserDetail';
import { createBadRequestError, createNotFoundError, createServerError } from "./errorCreators";



export function filterSensitiveUserFields(user) {
  const filteredUser = JSON.parse(JSON.stringify(user));
  if (filteredUser.salt) delete filteredUser.salt;
  if (filteredUser.hash) delete filteredUser.hash;
  if (filteredUser.googleId) delete filteredUser.googleId;
  if (filteredUser.createdAt) delete filteredUser.createdAt;
  if (filteredUser.updatedAt) delete filteredUser.updatedAt;
  return filteredUser;
};

export function filterCommonFields(body) {
  if(body.createdAt) delete body.createdAt;
  if(body.updatedAt) delete body.updatedAt;
  if(body._id) delete body._id;
}

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

export async function fetchUserLinks(userId) {
  try {
    const links = await UserDetail.findOne({ userId: userId}, 'linkedAccounts')
      .populate('linkedAccounts');
    if(!links) throw createNotFoundError('Links not found');
    return links; 
  } catch (err) {
    throw createServerError(err.message);
  }
}

export async function linkUser(userId, body) {
  if(!body || !body.targetUserId || !body.relation) throw createBadRequestError('Invalid body. Properly set body with target and relation');
  try {
    filterCommonFields(body);
    const user = await UserDetail.findOne({ userId: userId }, 'linkedAccounts');
    user.linkedAccounts.push(body);
    await user.save();
    return true;
  } catch (error) {
    throw createServerError(error.message);
  }
}

export async function unlinkUser(userId, linkid) {
  try {
    const user = await UserDetail.findOne({ userId: userId }, 'linkedAccounts');
    if (!user || !user.linkedAccounts || !user.linkedAccounts.id(linkid)) {
      throw createNotFoundError('Link not found');
    }
    user.linkedAccounts.id(linkid).remove();
    await user.save();
    return true;
  } catch (error) {
    throw createServerError(error.message);
  }
}

export async function fetchReceivedRequests(userId) {
  try {
    const requests = await ContactRequest.findMany({ to: userId }, '-to');
    if (!requests) throw createNotFoundError('Contact Requests not found');
    return requests;
  } catch (err) {
    throw createServerError(err.message);
  }

}

export async function fetchSentRequests(userId) {
  try {
    const requests = await ContactRequest.findMany({ from: userId }, '-from');
    if (!requests) throw createNotFoundError('Contact Requests not found');
    return requests;
  } catch (err) {
    throw createServerError(err.message);
  }
}

export async function changeRequestStatus(requestId, body) {
  if (!requestId || !body || !body.status) {
    throw createBadRequestError('Invalid Request body.');
  }
  try {
    const contactRequest = await ContactRequest.findById(requestId, 'status');
    if (!contactRequest) throw createNotFoundError('Contact requests not found');
    contactRequest.status = body.status;
    await contactRequest.save();
    return true;
  } catch (error) {
    throw createServerError(error.message);
  }
}

export async function fetchAnswers(userId) {
  try {
    const user = await UserDetail.findOne({ userId: userId }, 'answers');
    if (!user) throw createNotFoundError('user not found');
    return user.answers;
  } catch (error) {
    throw createServerError(error.message);
  }
}

export async function submitBiodata(userId, biodata) {
  if(!biodata) throw createBadRequestError('Provide the biodata');
  try {
    const user = await UserDetail.findOne({ userId: userId }, 'answers');
    if (!user) throw createNotFoundError('User not found');
    user.answers = biodata;
    return await user.save().answers;
  } catch (error) {
    throw createServerError(error.message);
  }
}

export async function updateBiodata(userId, updatedBiodata) {
  if(!updatedBiodata) throw createBadRequestError('Provide the biodata');
  try {
    const user = await UserDetail.findOne({ userId: userId }, 'answers');
    updatedBiodata.forEach((val) => {
      if(user.answers.id(val.id)){
        user.answers.id(val.id).answer = val.answer;
      }
    });
    return user.save().answers;
  } catch (error) {
    throw createServerError(error.message);
  }
}

export async function invisibleBiodata(userId) {
  try {
    const user = await user.findById(userId);
    user.verifiedBiodata = false;
    await user.save();
    return true;
  } catch (error) {
    throw createServerError(error.message);
  }
}