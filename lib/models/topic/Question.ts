enum QuestionType {
    TextField,
    TextArea,
    MultiSelect,
    Select,
    MultiInput,
}

enum Gender {
    Male,
    Female,
    Both
}

export class Question {
    bnTitle: string;
    enTitle: string;
    questionType: QuestionType;
    bnValues: string[] | null;
    enValues: string[] | null;
    isRequired: boolean;
    questionFor: Gender;
    bnHelperText: string;
    enHelperText: string;
    orderId: number;
    createdAt: string;
    updatedAt: string;

    constructor(bnTitle: string, enTitle: string, questionType: QuestionType, isRequired: boolean, questionFor: Gender, orderId: number, createdAt: string, updatedAt: string, bnValues = null, enValues  = null, bnHelperText = null, enHelperText = null) { 
        this.bnTitle = bnTitle;
        this.enTitle = enTitle;
        this.questionType = questionType;
        this.bnValues = bnValues;
        this.enValues = enValues;
        this.isRequired = isRequired;
        this.questionFor = questionFor;
        this.bnHelperText = bnHelperText;
        this.enHelperText = enHelperText;
        this.orderId = orderId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}