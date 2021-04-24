interface ConstructorParams {
    degreeName: string;
    department: string;
    passYear: number | null;
    instituteName: string;
    result: string | null;
}

export default class EducationQualification {
    degreeName: string;
    department: string;
    passYear: number | null;
    instituteName: string;
    result: string | null;

    constructor({degreeName, department, passYear=null, instituteName, result=null}: ConstructorParams) {
        this.degreeName = degreeName;
        this.department = department;
        this.passYear = passYear;
        this.instituteName = instituteName;
        this.result = result;
    }
}