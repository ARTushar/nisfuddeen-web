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
        let ret = '';
        if (this.min === undefined) ret += '-';
        else ret += this.min.toString();

        ret += '-';

        if (this.max === undefined) ret += '-';
        else ret += this.max.toString();
    }

    static fromFormatString(val: string) {
        let min, max;
        const values = val.split('-');
        if(values.length == 3 && values[0] === '' && values[1] === '') {
            max = parseInt(values[2]);
        }
        else if(values.length == 2 && values[0] !== '' && values[1] !== '') {
            min = parseInt(values[0]);
            max = parseInt(values[1]);
        } else if(values.length == 3 && values[1] === '' && values[2] === '') {
            min = parseInt(values[0]);
        }
        return new RangePair(min, max);
    }
}

export function getTypeFromValue(obj, val) {
    const type = Object.keys(obj).find(key => obj[key] === val);
    console.assert(type !== undefined);
    return type
}
