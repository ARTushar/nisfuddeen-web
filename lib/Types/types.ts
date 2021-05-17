import Biodata from '../models/biodata/Biodata';

export class BirthDay {
    year: number;
    month: number;
    day: number;
    private isoDate: Date

    constructor(year: number, month: number, day: number) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.isoDate = (year && month && day)?  new Date(year, month-1, day): undefined;
    }

    toISOString(){
        return this.isoDate.toISOString();
    }

    static constructBirthDay(bDay) {
        return new BirthDay(bDay.year, bDay.month, bDay.day);
    }

    static fromISOString(date: string) {
        if(!date) return undefined;
        const bday = new Date(date);
        return new BirthDay(bday.getFullYear(), bday.getMonth()+1, bday.getDate());
    }

    isEqual(obj: BirthDay): boolean {
        return this.year === obj.year && this.month === obj.month && this.day === obj.day;
    }

}

export class RangePair {
    min: number;
    max: number;

    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }

    toFormatString() {
        return JSON.stringify(this);
    }

    static fromFormatString(val: string) {
        if(!val) return undefined;
        let value = JSON.parse(val);
        return new RangePair(value.min, value.max);
    }

    isEqual(obj: RangePair): boolean {
        return this.min === obj.min && this.max === obj.max;
    }
}

export function getTypeFromValue(obj, val) {
    const type = Object.keys(obj).find(key => obj[key] === val);
    console.assert(type !== undefined);
    return type
}
