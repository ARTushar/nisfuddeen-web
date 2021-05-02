import { RangePair } from '../../Types/types';

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

export const PersonalInformationAliases = {
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

export const shortBiodataAliases = {
    'userid': 'uid',
    'gender': 'gn',
    'country': 'cn',
    'district': 'di',
    'maritalStatus': 'ms',
    'occupation': 'oc',
    'birthYear': 'by'
}

export const Gender = {
    Male :'m',
    Female :'f'
}

export const MaritalStatus = {
    Unmarried : 'um',
    MarriedWithChildren : 'mc',
    MarriedWithoutChildren : 'mwc',
    DivorcedWithChildren : 'dc',
    DivorcedWithoutChildren : 'dwc',
    Widow : 'w'
}

export const FacialColor = {
    PinkishWhite: 'pkw',
    PaleWhite : 'plw',
    FairWhite : 'fw',
    MediumFair : 'mf',
    LightBrown : 'lb',
    ModerateBrown : 'mb',
    Black : 'bl'
}

export const EducationDegree = {
    Secondary : 's',
    HigherSecondary : 'hs',
    Undergraduate : 'ug',
    Postgraduate : 'pg',
    Doctorate : 'd',
    PostDoctorate : 'pd'
}

export const BloodGroup = {
    'AB+' : 'ab+',
    'AB-' : 'ab-',
    'A+' : 'a+',
    'A-' : 'a-',
    'B+' : 'b+',
    'B-' : 'b-',
    'O+' : 'o+',
    'O-' : 'o-',
}

export const BeardStyle = {
    StylishBeard : 'stb',
    NoBeard : 'nb',
    SunnatiBeard : 'snb'
}

export const FinancialStatus = {
    UpperClass : 'uc',
    UpperMiddleClass : 'umc',
    MiddleClass : 'mc',
    LowerMiddleClass : 'lmc',
    LowerClass : 'lc'
}

export const MarriageReply = {
    Yes : 'y',
    No : 'n',
    YesIfSpouseAgrees : 'yis'
}

export const AfterMarriageStudyReply = {
    Yes : 'y',
    No : 'n',
    YesIfOnline : 'yio',
    YesIfHome : 'yih',
    YesIfOnlineOrHome : 'yioh'
}

export const MohoranaTimeReply = {
    PartiallyDayOfMarriage : 'pdm',
    FullyDayOfMarriage : 'fdm',
    FullyLater : 'fl',
}

export const BoyOutfit = {
    Panjabi : 'pan',
    Pajama : 'paj',
    Pant : 'pan',
    Shirt : 'sh',
    TShirt : 'tsh',
}

export const GirlOutfit = {
    Abaya : 'ab',
    Hijab : 'hi',
    Scarf : 'sc',
    Zilbab : 'zi',
    Khimar : 'kh',
    SalwarKamiz : 'sk',
    ShortBurqa : 'sb',
    Tops : 'tp',
    Leggings : 'lg',
    Dupatta : 'dp',
    Shirt : 'sht',
    Shari : 'shi',
    Niqab : 'niq',
    HandSocks : 'hs',
    FeetSocks : 'fs',
}


export const MixAnswer = {
    Yes : 'y',
    No : 'n',
    NoButTryTo : 'nbt',
    Almost : 'al',
    Somewhat : 'sw'
}

export const PositiveAnswer = {
    Yes : 'y',
    NoButTryTo : 'nbt',
    No : 'n'
}

export const NegativeAnswer = {
    No : 'n',
    TryToAvoid : 'tta',
    Yes : 'y'
}

export const Guardian = {
    Father : 'f',
    Mother : 'm',
    Uncle : 'u',
    Aunt : 'a',
    GrandFather : 'gf',
    GrandMother : 'gm',
    Other : 'o'
}

export const Majhab = {
    Hanafi : 'h',
    Shafi : 'sh',
    Maleki : 'm',
    Hamboli : 'h',
    Salafi : 'sa',
}

export const AddressType = {
    Present : 'pr',
    Permanent : 'pe',
    Working : 'w',
    Home : 'h'
}

export const AccountType = {
    Bridegroom : 'bg',
    Moderator : 'm',
    Admin : 'a',
    Guardian : 'g'
}

export const SubscriptionType = {
    Free : 'f',
    Premium : 'p'
}

export const Relation = {
    Son : 's',
    Daughter : 'd',
    Nephew : 'ne',
    Niece : 'ni',
    GrandSon : 'gs',
    GrandDaughter : 'gd',
    Other : 'o'
}

export const RequestBiodataType = {
    Sent : 's',
    Received : 'r'
}

export const RequestBiodataStatus = {
    Sent : 'st',
    Seen : 'sn',
    Cancelled : 'ca',
    Accepted : 'ac'
}