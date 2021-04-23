export class EducationQualification {
    degreeName: string;
    department: string;
    passYear: number | null;
    instituteName: string;
    result: string | null;

    constructor(degreeName: string, department: string, passYear = null, instituteName: string, result = null) {
        this.degreeName = degreeName;
        this.department = department;
        this.passYear = passYear;
        this.instituteName = instituteName;
        this.result = result;
    }
}