import Joi from 'joi';
import { getKeys } from '../scripts/utils/utils';
import {
    BeardStyle,
    BoyOutfit,
    FacialColor,
    FinancialStatus,
    Gender,
    GirlOutfit, MaritalStatus
} from '../dataAccessLayer/utils/aliases';

const prayerTimesValids = [0, 1, 2, 3, 4, 5]
const validQueryTypes = ['1', '2', '3m', '3f', '4m', '4f', '5', '6'];

export default Joi.object({
    queryType: Joi.string().valid(validQueryTypes).required(),
    gender: Joi.string().required().valid(getKeys(Gender)),
    maritalStatus: Joi.string().valid(getKeys(MaritalStatus)).required(),
    type: Joi.string().valid(['permanent']).required(),
    country: Joi.string().lowercase().required(),
    division: Joi.string().lowercase(),
    district: Joi.string().lowercase(),
    postOffice: Joi.string().lowercase(),
    institute: Joi.string().lowercase()
      .when('queryType', {is: '2', then: Joi.required()}),
    occupation: Joi.string().lowercase()
      .when('queryType', {is: '4m', then: Joi.required()})
      .when('queryType', {is: '4f', then: Joi.required()})
      .when('queryType', {is: '5', then: Joi.required()})
      .when('queryType', {is: '6', then: Joi.required()}),
    facialColor: Joi.string().valid(getKeys(FacialColor))
      .when('queryType', {is: '5', then: Joi.required()}),
    financialStatus: Joi.string().valid(getKeys(FinancialStatus))
      .when('queryType', {is: '5', then: Joi.required()}),
    minAge: Joi.number().integer()
      .when('queryType', {is: '5', then: Joi.required()}),
    maxAge: Joi.number().integer()
      .when('queryType', {is: '5', then: Joi.required()}),
    prayerTimes: Joi.number().integer().valid(prayerTimesValids)
      .when('queryType', {is: '3m', then: Joi.required()})
      .when('queryType', {is: '3f', then: Joi.required()})
      .when('queryType', {is: '4m', then: Joi.required()})
      .when('queryType', {is: '4f', then: Joi.required()}),
    prayerTimesAwwal: Joi.number().integer().valid(prayerTimesValids)
      .when('queryType', {is: '3f', then: Joi.required()})
      .when('queryType', {is: '4f', then: Joi.required()}),
    prayerTimesJamah: Joi.number().integer().valid(prayerTimesValids)
      .when('queryType', {is: '3m', then: Joi.required()})
      .when('queryType', {is: '4m', then: Joi.required()}),
    beardStyle: Joi.string().valid(getKeys(BeardStyle))
      .when('queryType', {is: '3m', then: Joi.required()})
      .when('queryType', {is: '4m', then: Joi.required()}),
    aboveKnee: Joi.boolean()
      .when('queryType', {is: '3m', then: Joi.required()})
      .when('queryType', {is: '4m', then: Joi.required()}),
    outfit: Joi.alternatives().conditional('gender', {
        is: 'male', then: Joi.array().valid(getKeys(BoyOutfit)),
        otherwise: Joi.array().valid(getKeys(GirlOutfit))
    })
      .when('queryType', {is: '3m', then: Joi.required()})
      .when('queryType', {is: '3f', then: Joi.required()})
      .when('queryType', {is: '4m', then: Joi.required()})
      .when('queryType', {is: '4f', then: Joi.required()}),
    limit: Joi.number().integer(),
    lastKey: Joi.object(),
})