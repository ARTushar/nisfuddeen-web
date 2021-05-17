import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { biodataAliases } from '../../dataAccessLayer/utils/aliases';
import { isEqual } from '../../utils/helpers';
import {
    getBiodatasByGnMsLoc, getBiodatasByGnMsLocOcFcFsBd,
    getBiodatasByGnMsLocRel, getBiodatasByGnMsLocRelOc, getBiodatasByGnMsOcLoc,
    getBiodatasByGnMsUgLoc
} from '../../dataAccessLayer/entities/biodata/getBiodata';
import Address from './Address';

interface SBDConstructorParams {
    userId?: string;
    enabled: boolean;
    verified: boolean;
    gender?: string;
    country: string;
    district: string;
    maritalStatus: string;
    birthYear: number;
    occupation: string;
    createdAt?: string;
    updatedAt: string;
}

export default class ShortBiodata {
    userId: string;
    enabled: boolean;
    verified: boolean;
    gender: string;
    country: string;
    district: string;
    maritalStatus: string;
    birthYear: number;
    occupation: string;
    createdAt: string;
    updatedAt: string;

    constructor({userId, enabled, verified, gender, country, district, maritalStatus, birthYear, occupation, createdAt, updatedAt}: SBDConstructorParams) {
        this.userId = userId;
        this.enabled = enabled;
        this.verified = verified;
        this.gender = gender;
        this.country = country;
        this.district = district;
        this.maritalStatus = maritalStatus;
        this.birthYear = birthYear;
        this.occupation = occupation;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    mapToAlias() {
        return mapItemToAlias(biodataAliases, this);
    }

    static mapFromAlias(item) {
        return new ShortBiodata({
            birthYear: 0, userId: '', country: '', district: '', gender: '', maritalStatus: '', occupation: '',
            createdAt: '', enabled: false, updatedAt: '', verified: false,
            ...mapItemFromAlias(biodataAliases, item)
        })
    }


    isEqual(obj: ShortBiodata): boolean {
        return isEqual(this, obj);
    }

    static async fetchUserBiodatas(query) {
        const pAddress = new Address({
            type: query.type,
            country: query.country,
            division: query.division,
            district: query.district,
            postOffice: query.postOffice
        })

        const commonFields = {
            enabled: true,
            verified: false,
            gender: query.gender,
            maritalStatus: query.maritalStatus,
            pAddress,
            limit: query.limit,
            lastEvaluatedKey: query.lastKey
        }
        try {
            switch (query.queryType) {
                case '1':
                    return await getBiodatasByGnMsLoc(commonFields);
                case '2':
                    return await getBiodatasByGnMsUgLoc({
                        ...commonFields,
                        ugradInstitute: query.institute,
                    })
                case '3m':
                case '3f':
                    return await getBiodatasByGnMsLocRel({
                        ...commonFields,
                        prayerTimes: query.prayerTimes,
                        prayerTimesJamah: query.prayerTimesJamah,
                        prayerTimesAwwal: query.prayerTimesAwwal,
                        aboveKnee: query.aboveKnee,
                        beardStyle: query.beardStyle,
                        outfit: query.outfit,
                    })
                case '4m':
                case '4f':
                    return getBiodatasByGnMsLocRelOc({
                        ...commonFields,
                        prayerTimes: query.prayerTimes,
                        prayerTimesJamah: query.prayerTimesJamah,
                        prayerTimesAwwal: query.prayerTimesAwwal,
                        aboveKnee: query.aboveKnee,
                        beardStyle: query.beardStyle,
                        outfit: query.outfit,
                        occupation: query.occupation,
                    })
                case '5':
                    return getBiodatasByGnMsLocOcFcFsBd({
                        ...commonFields,
                        occupation: query.occupation,
                        facialColor: query.facialColor,
                        financialStatus: query.financialStatus,
                        minAge: query.minAge,
                        maxAge: query.maxAge,
                    })
                case '6':
                    return getBiodatasByGnMsOcLoc({
                        ...commonFields,
                        occupation: query.occupation
                    })
                default:
                    throw new Error('Invalid Type')
            }

        } catch (e) {
            throw e;
        }
    }
}