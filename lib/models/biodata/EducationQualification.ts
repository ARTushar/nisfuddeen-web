interface ConstructorParams {
    degreeName: string;
    department: string;
    passYear: number;
    instituteName: string;
    result: string;
}

export default class EducationQualification {
    degreeName: string;
    department: string;
    passYear: number;
    instituteName: string;
    result: string;

    constructor({degreeName, department, passYear, instituteName, result}: ConstructorParams) {
        this.degreeName = degreeName;
        this.department = department;
        this.passYear = passYear;
        this.instituteName = instituteName;
        this.result = result;
    }
}