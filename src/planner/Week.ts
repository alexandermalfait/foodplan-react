import moment, {Moment} from "moment";

export class Week {
    private monday: moment.Moment;

    constructor(monday: Moment) {
        this.monday = monday;
    }

    getDates():Moment[] {
        const dates = []

        let day = this.monday.clone()
        let sunday = this.monday.clone().day(7)

        while(day <= sunday) {
            dates.push(day.clone())
            day = day.add(1, "day")
        }

        return dates;
    }

    add(delta: number) {
        return new Week(this.monday.add(delta, 'week'));
    }

    static currentWeek() {
        return new Week(moment().startOf('isoWeek'))
    }

    static fromDate(date: Date|Moment) {
        return new Week(moment(date).startOf('isoWeek'))
    }
}