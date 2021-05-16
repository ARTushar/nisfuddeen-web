import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { requestAliases } from '../../dataAccessLayer/utils/aliases';
import getReceivedRequests from '../../dataAccessLayer/entities/profile/getReceivedRequests';
import getSentRequests from '../../dataAccessLayer/entities/profile/getSentRequests';
import createRequest from '../../dataAccessLayer/entities/profile/createRequest';
import deleteRequest from '../../dataAccessLayer/entities/profile/deleteRequest';
import updateStatusRequest from '../../dataAccessLayer/entities/profile/updateStatusRequest';

interface RBConstructorParams {
    status?: string;
    requestBy?: string;
    requestTo?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default class Request {
    status: string;
    requestBy: string;
    requestTo: string;
    createdAt: string;
    updatedAt: string;

    constructor({status, requestBy, requestTo, createdAt, updatedAt}: RBConstructorParams) {
        this.status = status;
        this.requestBy = requestBy;
        this.requestTo= requestTo;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    mapToAlias() {
        return mapItemToAlias(requestAliases, this);
    }

    static mapFromAlias(item) {
        return new Request({
            ...mapItemFromAlias(requestAliases, item)
        })
    }

    static async getReceivedRequests(userId: string) {
        try {
            return await getReceivedRequests(userId);
        } catch (e) {
            throw e;
        }
    }

    static async getSentRequests(userId: string) {
        try {
            return await getSentRequests(userId);
        } catch (e) {
            throw e;
        }
    }

    static async createRequest(by: string, to: string) {
        if(by === to) return null;
        try {
            return await createRequest(by, to);
        } catch (e) {
            throw e;
        }
    }

    static async updateStatus(by: string, to: string, status: string) {
        if(by === to) return null;
        try {
            return await updateStatusRequest(by, to, status);
        } catch (e) {
            throw e;
        }
    }

    static async deleteRequest(by: string, to: string) {
        if(by === to) return null;
        try {
            return await deleteRequest(by, to);
        } catch (e) {
            throw e;
        }
    }
}