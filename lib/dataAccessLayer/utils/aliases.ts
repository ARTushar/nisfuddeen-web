import { getKeys } from '../../scripts/utils/utils';

export const userAliases = {
    "fullName": "fn",
    "email": "em",
    "emailVerified": "emv",
    "createdAt": "_ca",
    "updatedAt": "_ua",
    "mobileNumber": "mb",
    "accountType": "ac",
    "subscriptionType": "st"
}

export const sessionAliases = {
    "sessionToken": "sid",
    "accessToken": "at",
    "userId": "uid",
    "createdAt": "ca",
    "updatedAt": "ua",
    "expires": "ea",
}

export const accountAliases = {
    "providerId": "pid",
    "userId": "uid",
    "providerAccountId": "aid",
    "providerType": "pt",
    "refreshToken": "rt",
    "accessToken": "at",
    "accessTokenExpires": "ate",
    "createdAt": "_ca",
    "updatedAt": "_ua"
}


export const addressAliases = {
    "type": "tp",
    "country": "cn",
    "division": "dv",
    "district": "di",
    "postOffice": "po"
}

export const basicInformationAliases = {
    "gender": "gn",
    "maritalStatus": "ms",
    "birthDay": "bd",
    "facialColor": "fc",
    "height": "h",
    "weight": "w",
    "bloodGroup": "bg",
    "occupation":"oc",
}

export const contactInformationAliases = {
    'fatherMobile': 'fm',
    'motherMobile': 'mm',
    'guardianMobile': 'gm'
}

export const educationQualificationAliases = {
    'degreeName': 'dn',
    'department': 'dp',
    'passYear': 'py',
    'instituteName': 'in',
    'result': 'res'
}

export const extraInformationAliases = {
    'aboutMe': 'am',
    'aboutOccupation': 'ao',
    'guardianKnowsAboutSubmission': 'gkas'
}

export const familyInformationAliases = {
    'fatherAlive': 'fa',
    'fatherOccupation': 'fo',
    'motherAlive': 'ma',
    'motherOccupation': 'mo',
    'totalSisters': 'ts',
    'totalBrothers': 'tb',
    'brothersStatus': 'bs',
    'sistersStatus': 'ss',
    'financialStatus': 'fs',
    'socialStatus': 'sos',
    'unclesStatus': 'us'
}

export const marriageInformationAliases = {
    'guardianAgreed': 'ga',
    'reasonOfMarriage': 'rom',
    'ideaAboutMarriage': 'iam',
    'jobAfterMarriage': 'jam', // MarriageReply
    'carryStudyAfterMarriage': 'csam', // MarriageReply,
    'willManageWifePardah': 'wmwp',
    'willAllowWifeStudy': 'waws', // AfterMarriageStudyReply,
    'afterMarriageStay': 'ams',
    'desiresDowryOrGift': 'dwg',
    'maleMohoranaRange': 'mmr',
    'maleMohoranaPaidTime': 'mopt', // MohoranaTimeReply,
    'femaleMohoranaExpectation': 'fme',
    'femaleMohoranaExpectedPaidTime': 'fmept', // MohoranaTimeReply
}

export const partnerQualitiesAliases = {
    'ageRange': 'ar',
    'facialComplexion': 'fc', //FacialColor,
    'heightRange': 'ht',
    'minimumEducationDegree': 'med', // EducationDegree,
    'country': 'cn',
    'district': 'di',
    'maritalStatus': 'ms', // MaritalStatus,
    'occupation': 'oc',
    'financialStatus': 'fs', // FinancialStatus[],
    'desiredQualities': 'dq',
}

export const personalInformationAliases = {
    'outfit': 'of', // BoyOutfit[] | GirlOutfit[],
    'beardStyle': 'bs', // BeardStyle
    'pantPajamaAboveKnee': 'ak',
    'prayerTimes': 'pt',
    'malePrayerTimesInJamah': 'mptj',
    'femalePrayerTimesInAwwal': 'fpta',
    'durationOfRegularPrayer': 'drp',
    'mahramMaintain': 'mm', // MixAnswer,
    'majhab': 'ma', // Majhab,
    'politicalPhilosophy': 'pp',
    'watchDramaMovie': 'wdm', // NegativeAnswer,
    'readSahihQuran': 'rsq', // PositiveAnswer,
    'listenMusic': 'lm', // NegativeAnswer,
    'anyDisease': 'ad',
    'deenMehnat': 'dm',
    'pirFollower': 'pf',
    'mazarBelief': 'mb',
    'favoriteIslamicBooks': 'fib',
    'favoriteScholars': 'fs',
    'specialQualities': 'sq',
    'guardian': 'g', // Guardian,

}

export const biodataAliases = {
    'userId' : 'uid',
    'enabled': 'en',
    'verified': 'vr',
    'createdAt': '_ca',
    'updatedAt': '_ua',
    'gender': 'gn',
    'country': 'cn',
    'district': 'di',
    'maritalStatus': 'ms',
    'occupation': 'oc',
    'birthYear': 'by'
}

export const starAliases = {
    'starBy': 'by',
    'starTo': 'to',
    'starredAt': 'sa',
}

export const linkAliases = {
    'linkBy': 'by',
    'linkTo': 'to',
    'relation': 'rel',
    'createdAt': 'ca',
    'updatedAt': 'ua',
}

export const requestAliases = {
    'requestBy': 'by',
    'requestTo': 'to',
    'status': 'st',
    'createdAt': 'ca',
    'updatedAt': 'ua'
}

export const Gender = {
    male :'m',
    female :'f'
}

export const InvertGender = {
    "m": "male",
    "f": "female"
}

export const MaritalStatus = {
    unmarried : 'um',
    marriedWithChildren : 'mc',
    marriedWithoutChildren : 'mwc',
    divorcedWithChildren : 'dc',
    divorcedWithoutChildren : 'dwc',
    widow : 'w'
}

export const InvertMaritalStatus = {
    "um": "unmarried",
    "mc": "marriedWithChildren",
    "mwc": "marriedWithoutChildren",
    "dc": "divorcedWithChildren",
    "dwc": "divorcedWithoutChildren",
    "w": "widow"
}

export const FacialColor = {
    pinkishWhite: 'pkw',
    paleWhite : 'plw',
    fairWhite : 'fw',
    mediumFair : 'mf',
    lightBrown : 'lb',
    moderateBrown : 'mb',
    black : 'bl'
}

export const InvertFacialColor = {
    "pkw": "pinkishWhite",
    "plw": "paleWhite",
    "fw": "fairWhite",
    "mf": "mediumFair",
    "lb": "lightBrown",
    "mb": "moderateBrown",
    "bl": "black"
}


export const EducationDegree = {
    secondary : 's',
    higherSecondary : 'hs',
    undergraduate : 'ug',
    postgraduate : 'pg',
    doctorate : 'd',
    postDoctorate : 'pd'
}

export const InvertEducationDegree = {
    "s": "secondary",
    "hs": "higherSecondary",
    "ug": "undergraduate",
    "pg": "postgraduate",
    "d": "doctorate",
    "pd": "postDoctorate"
}


export const BloodGroup = {
    'ab+' : 'ab+',
    'ab-' : 'ab-',
    'a+' : 'a+',
    'a-' : 'a-',
    'b+' : 'b+',
    'b-' : 'b-',
    'o+' : 'o+',
    'o-' : 'o-',
}

export const InvertBloodGroup = {
    "ab+": "ab+",
    "ab-": "ab-",
    "a+": "a+",
    "a-": "a-",
    "b+": "b+",
    "b-": "b-",
    "o+": "o+",
    "o-": "o-"
}

export const BeardStyle = {
    stylishBeard : 'stb',
    noBeard : 'nb',
    sunnatiBeard : 'snb'
}

export const FinancialStatus = {
    upperClass : 'uc',
    upperMiddleClass : 'umc',
    middleClass : 'mc',
    lowerMiddleClass : 'lmc',
    lowerClass : 'lc'
}

export const MarriageReply = {
    yes : 'y',
    no : 'n',
    yesIfSpouseAgrees : 'yis'
}

export const AfterMarriageStudyReply = {
    yes : 'y',
    no : 'n',
    yesIfOnline : 'yio',
    yesIfHome : 'yih',
    yesIfOnlineOrHome : 'yioh'
}

export const MohoranaTimeReply = {
    partiallyDayOfMarriage : 'pdm',
    fullyDayOfMarriage : 'fdm',
    fullyLater : 'fl',
}

export const BoyOutfit = {
    panjabi : 'pan',
    pajama : 'paj',
    pant : 'pan',
    shirt : 'sh',
    tshirt : 'tsh',
}

export const GirlOutfit = {
    abaya : 'ab',
    hijab : 'hi',
    scarf : 'sc',
    zilbab : 'zi',
    khimar : 'kh',
    salwarKamiz : 'sk',
    shortBurqa : 'sb',
    tops : 'tp',
    leggings : 'lg',
    dupatta : 'dp',
    shirt : 'sht',
    shari : 'shi',
    niqab : 'niq',
    handSocks : 'hs',
    feetSocks : 'fs',
}


export const MixAnswer = {
    yes : 'y',
    no : 'n',
    noButTryTo : 'nbt',
    almost : 'al',
    somewhat : 'sw'
}

export const PositiveAnswer = {
    yes : 'y',
    noButTryTo : 'nbt',
    no : 'n'
}

export const NegativeAnswer = {
    no : 'n',
    tryToAvoid : 'tta',
    yes : 'y'
}

export const Guardian = {
    father : 'f',
    mother : 'm',
    uncle : 'u',
    aunt : 'a',
    grandFather : 'gf',
    grandMother : 'gm',
    other : 'o'
}

export const Majhab = {
    hanafi : 'h',
    shafi : 'sh',
    maleki : 'm',
    hamboli : 'hm',
    salafi : 'sa',
}

export const AddressType = {
    present : 'pr',
    permanent : 'pe',
    working : 'w',
    home : 'h'
}

export const AccountType = {
    bridegroom : 'bg',
    moderator : 'm',
    admin : 'a',
    guardian : 'g'
}

export const SubscriptionType = {
    free : 'f',
    premium : 'p'
}

export const Relation = {
    son : 's',
    daughter : 'd',
    nephew : 'ne',
    niece : 'ni',
    grandson : 'gs',
    granddaughter : 'gd',
    other : 'o'
}

export const RequestBiodataType = {
    sent : 's',
    received : 'r'
}

export const RequestBiodataStatus = {
    sent : 'st',
    seen : 'sn',
    cancelled : 'ca',
    accepted : 'ac'
}

export function invertAlias(type) {
    let invertType = {};
    for(const key of Object.keys(type)) {
        const val = type[key];
        invertType[val] = key;
    }
    return invertType;
}