import { Question } from "./Question";

export class Topic {
    bnTitle: string;
    enTitle: string;
    questions: Question[];
    orderId: number;
    createdAt: string;
    updatedAt: string;

    constructor(bnTitle: string, enTitle: string, questions: Question[], orderId: number, createdAt: string, updatedAt: string) {
        this.bnTitle = bnTitle;
        this.enTitle = enTitle
        this.questions = questions;
        this.orderId = orderId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}