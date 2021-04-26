// import { biodataFields, homeUserFields, restrictedUserFields } from "../constants/databaseConstants";
// import ContactRequest from "../models/ContactRequest";
// import Topic from "../models/Topic";
// import User from "../models/User";
// import UserDetail from '../models/UserDetail';
// import { createBadRequestError, createNotFoundError, createServerError } from "./errorCreators";
import { errorFactory } from "./helpers";
//
//
//
// export function filterSensitiveUserFields(user) {
//   const filteredUser = JSON.parse(JSON.stringify(user));
//   if (filteredUser.salt) delete filteredUser.salt;
//   if (filteredUser.hash) delete filteredUser.hash;
//   if (filteredUser.googleId) delete filteredUser.googleId;
//   if (filteredUser.createdAt) delete filteredUser.createdAt;
//   if (filteredUser.updatedAt) delete filteredUser.updatedAt;
//   return filteredUser;
// };
//
// export function filterCommonFields(body) {
//   if (body.createdAt) delete body.createdAt;
//   if (body.updatedAt) delete body.updatedAt;
//   if (body._id) delete body._id;
// }
//
// export async function saveUserFields(user, body) {
//   if (!body) throw createNotFoundError('Body Not Found');
//
//   if (body.name) user.name = body.name;
//   if (body.email) user.email = body.email;
//   if (body.maritalStatus) user.maritalStatus = body.maritalStatus;
//   if (body.height) user.height = body.height;
//   if (body.weight) user.weight = body.weight;
//   if (body.occupation) user.occupation = body.occupation;
//   if (body.gender) user.gender = body.gender;
//   if (body.birthYear) user.birthYear = body.birthYear;
//   if (body.prayerTimes) user.prayerTimes = body.prayerTimes;
//   if (body.veilStyle) user.veilStyle = body.veilStyle;
//   if (body.dressUpStyle) user.dressUpStyle = body.dressUpStyle;
//   if (body.pantPajamaAboveKnee) user.pantPajamaAboveKnee = body.pantPajamaAboveKnee;
//   if (body.haveHandfulBeard) user.haveHandfulBeard = body.haveHandfulBeard;
//   if (body.presentAddress) {
//     if(!user.presentAddress) user.presentAddress = {};
//     if (body.presentAddress.country) {
//       user.presentAddress.country = body.presentAddress.country;
//     }
//     if (body.presentAddress.district) {
//       user.presentAddress.district = body.presentAddress.district;
//     }
//     if (body.presentAddress.division) {
//       user.presentAddress.division = body.presentAddress.division;
//     }
//     if (body.presentAddress.postOffice) {
//       user.presentAddress.postOffice = body.presentAddress.postOffice;
//     }
//   }
//   if (body.permanentAddress) {
//     if(!user.permanentAddress) user.permanentAddress = {};
//
//     if (body.permanentAddress.country) {
//       user.permanentAddress.country = body.permanentAddress.country;
//     }
//     if (body.permanentAddress.district) {
//       user.permanentAddress.district = body.permanentAddress.district;
//     }
//     if (body.permanentAddress.division) {
//       user.permanentAddress.division = body.permanentAddress.division;
//     }
//     if (body.permanentAddress.postOffice) {
//       user.permanentAddress.postOffice = body.permanentAddress.postOffice;
//     }
//   }
//   try {
//     return await user.save();
//   } catch (error) {
//     throw createServerError(error.message);
//   }
// }
//
//
// export async function fetchUserInformation(userId) {
//   try {
//     const user = await User.findById(userId, restrictedUserFields);
//     if (!user) throw createNotFoundError('User Not Found');
//     return user;
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function fetchUserWishlist(userId) {
//   try {
//     const user = await UserDetail.findOne({ userId: userId }, 'wishList')
//       .populate('wishList', homeUserFields);
//     if (!user) throw createNotFoundError('User Not Found');
//     return user;
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function findUser(userId) {
//   try {
//     const user = await User.findById(userId, '_id');
//     if (!user) throw createNotFoundError('User Not Found');
//     return user;
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function appendUserInWishlist(userId, targetUserId) {
//   try {
//     const user = await UserDetail.findOne({ userId: userId }, 'wishList')
//     if (!user) throw createNotFoundError('User Not Found');
//     user.wishList.push(targetUserId);
//     await user.save();
//     return true;
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function deleteUserFromWishlist(userId, targetUserId) {
//   try {
//     const user = await UserDetail.findOne({ userId: userId }, 'wishList')
//     if (!user) throw createNotFoundError('User Not Found');
//     let temp = -1;
//     if (user.wishList) {
//       temp = user.wishList.indexOf(targetUserId);
//       user.wishList.pull(targetUserId);
//     }
//     if (temp == -1) throw createNotFoundError('user not found');
//     await user.save();
//     return true;
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function fetchUserLinks(userId) {
//   try {
//     const links = await UserDetail.findOne({ userId: userId }, 'linkedAccounts')
//       .populate('linkedAccounts');
//     if (!links) throw createNotFoundError('Links not found');
//     return links;
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function linkUser(userId, body) {
//   if (!body || !body.userId || !body.relation) throw createBadRequestError('Invalid body. Properly set body with target and relation');
//   console.log(userId);
//   console.log(body.userId);
//   if (userId.equals(body.userId)) throw createBadRequestError('Provide a valid userid');
//   try {
//     filterCommonFields(body);
//     const user = await UserDetail.findOne({ userId: userId }, 'linkedAccounts');
//     if (user._id.equals(body.userId)) throw createBadRequestError('Provide a valid userid');
//     // check duplicate link accounts
//     user.linkedAccounts.forEach((val, i) => {
//       if (val.userId.equals(body.userId)) throw createServerError('Duplicate Link account error');
//     })
//
//     user.linkedAccounts.push(body);
//     const updatedUser = await user.save();
//     console.log(updatedUser._id);
//     return true;
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function unlinkUser(userId, linkid) {
//   try {
//     const user = await UserDetail.findOne({ userId: userId }, 'linkedAccounts');
//     if (!user || !user.linkedAccounts || !user.linkedAccounts.id(linkid)) {
//       throw createNotFoundError('Link not found');
//     }
//     user.linkedAccounts.id(linkid).remove();
//     await user.save();
//     return true;
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function fetchReceivedRequests(userId) {
//   try {
//     const requests = await ContactRequest.findMany({ to: userId }, '-to');
//     if (!requests) throw createNotFoundError('Contact Requests not found');
//     return requests;
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
//
// }
//
// export async function fetchSentRequests(userId) {
//   try {
//     const requests = await ContactRequest.findMany({ from: userId }, '-from');
//     if (!requests) throw createNotFoundError('Contact Requests not found');
//     return requests;
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function changeRequestStatus(requestId, body) {
//   if (!requestId || !body || !body.status) {
//     throw createBadRequestError('Invalid Request body.');
//   }
//   try {
//     const contactRequest = await ContactRequest.findById(requestId, 'status');
//     if (!contactRequest) throw createNotFoundError('Contact requests not found');
//     contactRequest.status = body.status;
//     await contactRequest.save();
//     return true;
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function fetchAnswers(userId) {
//   try {
//     const user = await UserDetail.findOne({ userId: userId }, 'answers');
//     if (!user) throw createNotFoundError('user not found');
//     return user.answers;
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function submitBiodata(userId, biodata) {
//   if (!biodata) throw createBadRequestError('Provide the biodata');
//   try {
//     const user = await UserDetail.findOne({ userId: userId }, 'answers');
//     if (!user) throw createNotFoundError('User not found');
//     user.answers = biodata;
//     return await user.save().answers;
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function updateBiodata(userId, updatedBiodata) {
//   if (!updatedBiodata) throw createBadRequestError('Provide the biodata');
//   try {
//     const user = await UserDetail.findOne({ userId: userId }, 'answers');
//     updatedBiodata.forEach((val) => {
//       if (user.answers.id(val.id)) {
//         user.answers.id(val.id).answer = val.answer;
//       }
//     });
//     return user.save().answers;
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function invisibleBiodata(userId) {
//   try {
//     const user = await user.findById(userId);
//     user.verifiedBiodata = false;
//     await user.save();
//     return true;
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function fetchUsers(query) {
//   if (!query || !query.page || !query.limit) {
//     throw createBadRequestError('Provide page and limit');
//   }
//   const options = {
//     page: query.page,
//     limit: query.limit,
//     select: 'gender createdAt updatedAt',
//     sort: { createdAt: 1 }
//   };
//   try {
//     const users = await User.paginate({}, options);
//     return users;
//   } catch (error) {
//     throw createServerError(error.message);
//   }
// }
//
// export async function fetchUserDetailAdmin(userId) {
//   try {
//     const userDetailInfo = await UserDetail.findOne({ userId: userId })
//       .populate('userId');
//     if (!userDetailInfo) throw createNotFoundError('User not found');
//     return userDetailInfo;
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function fetchBiodatas(query) {
//   if (!query || query.page || query.limit || query.filter) {
//     throw createBadRequestError('Provide query information appropriately');
//   }
//   query.filter.verifiedBiodata = true;
//
//   const options = {
//     page: query.page,
//     limit: query.limit,
//     select: homeUserFields,
//   };
//   try {
//     const users = await User.pagination(query.filter, options);
//     return users;
//   } catch (error) {
//     createServerError(error.message);
//   }
// }
//
// export async function fetchBiodataDetails(userId) {
//   try {
//     const user = await UserDetail.findOne({ userId: userId })
//       .populate('userId', biodataFields);
//     if (!user) throw createNotFoundError('User not found');
//     if (!user.userId.verifiedBiodata) throw createBadRequestError('Invalid userid');
//     return user;
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function requestContact(from, to) {
//   // TO DO: implement notification logics here
//   try {
//     const request = new ContactRequest({ from, to });
//     await request.save();
//     return true;
//   } catch (error) {
//     throw createServerError(error.message);
//   }
// }
//
// export async function verifyBiodata(userId) {
//   try {
//     const user = await User.findById(userId).select('verifiedBiodata');
//     if (!user) throw createNotFoundError('User not found');
//     user.verifiedBiodata = true;
//     return await user.save();
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function fetchTopics() {
//   try {
//     const topics = await Topic.find({});
//     return topics;
//   } catch (error) {
//     throw createServerError(error.message);
//   }
// }
//
// export async function addTopic(topic) {
//   if (!topic) throw createBadRequestError('Provide topic in the request body');
//   try {
//     filterCommonFields(topic);
//     const topic = new Topic(topic);
//     return await topic.save();
//   } catch (error) {
//     throw createServerError(error.message);
//   }
// }
//
// export async function removeTopic(topicId) {
//   try {
//     const resp = await Topic.deleteOne(topicId);
//     return resp;
//   } catch (error) {
//     throw createServerError(error.message);
//   }
//
// }
//
// export async function fetchTopicDetails(topicId) {
//   try {
//     const topic = await Topic.findById(topicId);
//     if (!topic) throw createNotFoundError('Topic not found');
//     return topic;
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function updateTopic(topicId, updatedTopic) {
//   if (!updatedTopic) throw createBadRequestError('Provide updated topic in the request body');
//   try {
//     const topic = await Topic.findById(topicId).select('bnTitle enTitle orderId');
//     if (!topic) throw createNotFoundError('Topic not found');
//     if (updatedTopic.bnTitle) topic.bnTitle = updatedTopic.bnTitle;
//     if (updatedTopic.enTitle) topic.enTitle = updatedTopic.enTitle;
//     if (updatedTopic.orderId) topic.orderId = updatedTopic.orderId;
//     return await topic.save();
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function fetchQuestions(topicId) {
//   try {
//     const topic = await Topic.findById(topicId).select('questions');
//     if (!topic) throw createNotFoundError('Topic not found');
//     return topic.questions;
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function fetchAQuestion(topicId, questionId) {
//   try {
//     const topic = await Topic.findById(topicId).select('questions');
//     if (!topic) throw createNotFoundError('Topic not found');
//     if (topic.questions && topic.questions.id(questionId)) {
//       return topic.questions.id(questionId);
//     }
//     throw createNotFoundError('Question not found');
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function addQuestion(topicId, question) {
//   if (!question) throw createBadRequestError('Provide Question in the request body');
//   try {
//     const topic = await Topic.findById(topicId).select('questions');
//     if (!topic) throw createNotFoundError('Topic not found');
//     filterCommonFields(question);
//     topic.questions.push(question);
//     return await topic.save();
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function removeQuestion(topicId, questionId) {
//   try {
//     const topic = await Topic.findById(topicId).select('questions');
//     if (!topic) throw createNotFoundError('Topic not found');
//     if (topic.questions.id(questionId)) {
//       topic.questions.id(questionId).remove();
//     } else {
//       throw createNotFoundError('Question not found');
//     }
//     return await topic.save();
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function updateQuestion(topicId, questionId, updatedQuestion) {
//   if (!updatedQuestion) throw createBadRequestError('Provide updated question in the request body');
//   try {
//     const topic = await Topic.findById(topicId).select('questions');
//     if (!topic) throw createNotFoundError('Topic not found');
//     filterCommonFields(updatedQuestion);
//     if (topic.questions.id(questionId)) {
//       const question = topic.questions.id(questionId);
//       if (updatedQuestion.bnTitle) question.bnTitle = updatedQuestion.bnTitle;
//       if (updatedQuestion.enTitle) question.enTitle = updatedQuestion.enTitle;
//       if (updatedQuestion.questionType) question.questionType = updatedQuestion.questionType;
//       if (updatedQuestion.enumBnValues) question.enumBnValues = updatedQuestion.enumBnValues;
//       if (updatedQuestion.enumEnValues) question.enumEnValues = updatedQuestion.enumEnValues;
//       if (updatedQuestion.isRequired) question.isRequired = updatedQuestion.isRequired;
//       if (updatedQuestion.questionFor) question.questionFor = updatedQuestion.questionFor;
//       if (updatedQuestion.bnHelperText) question.bnHelperText = updatedQuestion.bnHelperText;
//       if (updatedQuestion.enHelperText) question.enHelperText = updatedQuestion.enHelperText;
//       if (updatedQuestion.orderId) question.orderId = updatedQuestion.orderId;
//       return await topic.save().questions.id(questionId);
//     } else {
//       throw createNotFoundError('Question not found');
//     }
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }
//
// export async function makePremium(userId) {
//   try {
//     const user = await User.findById(userId).select('priviledgeType');
//     if (!user) throw createNotFoundError('User not found');
//     console.log(user);
//     user.priviledgeType = 'premium';
//     return await user.save();
//   } catch (error) {
//     throw errorFactory(error, createServerError);
//   }
// }