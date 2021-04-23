enum Gender {
    Male,
    Female
}

enum MaritalStatus {
    Unmarried,
    Married,
    Divorced,
    Widow
}

enum FacialColor {
    ExtremelyFair,
    Fair,
    Medium,
    Olive,
    Brown,
    Black
}

enum BloodGroup {
    ABPos,
    ABNeg,
    APos,
    ANeg,
    BPos,
    BNeg,
    OPos,
    ONeg,
}

class BirthDay {
    year: number;
    month: number;
    day: number;
}

export class BasiclInformation {
    gender: Gender;
    maritalStatus: MaritalStatus;
    birthDay: BirthDay;
    facialColor: FacialColor; 
    height: number;
    weight: number;
    bloodGroup: BloodGroup;
    occupation: string;

    constructor(gender: Gender, maritalStatus: MaritalStatus, birthDay: BirthDay, facialColor: FacialColor, height: number, weight: number, bloodGroup: BloodGroup, occupation: string) {
        this.gender = gender;
        this.maritalStatus = maritalStatus;
        this.birthDay = birthDay;
        this.facialColor = facialColor;
        this.height = height;
        this.weight = weight;
        this.bloodGroup = bloodGroup;
        this.occupation = occupation;
    }
}