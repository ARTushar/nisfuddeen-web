export class BirthDay {
    year: number;
    month: number;
    day: number;
    private isoDate: Date

    constructor(year: number, month: number, day: number) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.isoDate = new Date(year, month-1, day);
    }

    toISOString(){
        return this.isoDate.toISOString();
    }

    static fromISOString(date: string) {
        if(!date) return undefined;
        const bday = new Date(date);
        return new BirthDay(bday.getFullYear(), bday.getMonth()+1, bday.getDate());
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
}

export function getTypeFromValue(obj, val) {
    const type = Object.keys(obj).find(key => obj[key] === val);
    console.assert(type !== undefined);
    return type
}
