import createVR from '../../dataAccessLayer/entities/user/createVR';
import { getVR } from '../../dataAccessLayer/entities/user/getVR';
import { deleteVR } from '../../dataAccessLayer/entities/user/deleteVR';

interface VRConstructorParams {
    token: string;
    identifier: string;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
}

export default class VR {
    token: string;
    identifier: string;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;


    constructor({token, identifier, expiresAt, createdAt, updatedAt}: VRConstructorParams) {
        this.token = token;
        this.identifier = identifier;
        this.expiresAt = expiresAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static async createVR(identifier: string, token: string, secret: string, expiration: number): Promise<VR> {
        try {
            return await createVR(identifier, token, secret, expiration);
        } catch (e) {
            throw e;
        }
    }

    static async getVR(token: string, secret: string): Promise<VR> {
        try {
            return await getVR(token, secret);
        } catch (e) {
            throw e;
        }
    }

    static async deleteVR(token: string, secret: string): Promise<boolean> {
        try {
            return await deleteVR(token, secret);
        } catch (e) {
            throw e;
        }
    }
}