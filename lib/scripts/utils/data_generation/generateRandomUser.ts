import User from '../../../models/user/User';
import {
    generateRandomEmail,
    generateRandomMobileNumber,
    generateRandomName,
    getRandomEnumValue
} from '../utils';
import { nisfuddeenEnums } from '../../../Types/enums';

export function generateRandomUser() {
    return new User({
        fullName: generateRandomName(10),
        mobileNumber: generateRandomMobileNumber(),
        email: generateRandomEmail(),
        accountType: getRandomEnumValue(nisfuddeenEnums.accountType),
        subscriptionType: getRandomEnumValue(nisfuddeenEnums.subscriptionType)
    })
}