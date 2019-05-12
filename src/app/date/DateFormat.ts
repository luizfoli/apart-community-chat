export class DateFormat {

    returnDateFormat(date:Date):string {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return day + '/' + month + '/' + year;
    }

    returnTimeFormat(date:Date):string {
        return date.toTimeString().split(" ")[0];
    }

}