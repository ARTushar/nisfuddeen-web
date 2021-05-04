import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import {
    EducationDegree,
    educationQualificationAliases as eia,
    invertAlias
} from '../../dataAccessLayer/utils/aliases';

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

    mapToAlias() {
        return mapItemToAlias(eia, this);
    }

    static mapFromAlias(item) {
        return new EducationQualification({
            degreeName: '', department: '', instituteName: '', passYear: 0, result: '',
            ...mapItemFromAlias(eia, item)
        });
    }
}