export default class Dates {
    static MINUTE = 'MINUTE'
    static HOUR = 'HOUR'
    static DAY = 'DAY'
    static JANUARY_ENGLISH = 'January'
    static FEBRUARY_ENGLISH = 'February'
    static MARCH_ENGLISH = 'March'
    static APRIL_ENGLISH = 'April'
    static MAY_ENGLISH = 'May'
    static JUNE_ENGLISH = 'June'
    static JULY_ENGLISH = 'July'
    static AUGUST_ENGLISH = 'August'
    static SEPTEMBER_ENGLISH = 'September'
    static OCTOBER_ENGLISH = 'October'
    static NOVEMBER_ENGLISH = 'November'
    static DECEMBER_ENGLISH = 'December'


    static formatDate(date: Date) {
        let yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // getMonth() is zero-based
        let dd = date.getDate()

        return yyyy + '-' + (mm < 10 ? '0' + mm : mm) + '-' + (dd < 10 ? '0' + dd : dd)
    }

    
    static formatTime(date: Date) {
        let h = date.getHours();
        let m = date.getMinutes();
        return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m)
    }

    static isDateLessOrSameThan(date1: Date, date2: Date) {
        console.log(date1, date2);
        return date1 <= date2;
    }

    static stringToDateTime(date: string, time: string) {
        let datePart = date.split('-')
        let timePart = time.split(':')
        return new Date(Number(datePart[0]), Number(datePart[1]) - 1, Number(datePart[2]), Number(timePart[0]), Number(timePart[1]))
    }

    static stringToDate(date: string) {
        let datePart = date.split('-')
        return new Date(Number(datePart[0]), Number(datePart[1]) - 1, Number(datePart[2]))
    }

    static add(date: Date, type: string, n: number) {
        let minutes = 1000 * 60;
        let hours = minutes * 60;
        switch (type) {
            case Dates.MINUTE: {
                return new Date(date.getTime() + (minutes * n))
            }
            case Dates.HOUR: {
                return  new Date(date.getTime() + hours * n)
            }
            case Dates.DAY: {
                return new Date(date.getTime() + (hours * 24 * n))
            }
        }
    }
    static substract(date: Date, type: string, n: number) {
        let minutes = 1000 * 60;
        let hours = minutes * 60;
        switch (type) {
            case Dates.MINUTE: {
                return new Date(date.getTime() - (minutes * n))
            }
            case Dates.HOUR: {
                return  new Date(date.getTime() - (hours * n))
            }
            case Dates.DAY: {
                return new Date(date.getTime() - (hours * 24 * n))
            }
        }
    }
    static betweenDate(date:Date){
        let startDate = new Date(date.getFullYear(),date.getMonth(),1)
        let endDate = new Date(date.getFullYear(),date.getMonth()+1,1)
        endDate = Dates.substract(endDate,Dates.DAY,1)
        return "BETWEEN Date('" + Dates.formatDate(startDate) + "') AND Date('" + Dates.formatDate(endDate)+"')"
    }

    static format24to12hour(time:string){
        let timePart = time.split(':')
        let hours = Number(timePart[0]);
        let ampm = ' am'
        if(Number(timePart[0]) > 12){
            hours = hours - 12
            ampm = ' pm'
        }
        return hours + ':' + timePart[1] + ampm
    }
    
    static formatfullDate(date:Date,lang:string){
        let month = ''
        switch(date.getMonth()){
            case 0:{
                if(lang == 'EN'){
                    month = Dates.JANUARY_ENGLISH
                }
                break;
            }
            case 1:{
                if(lang == 'EN'){
                    month = Dates.FEBRUARY_ENGLISH
                }
                break;
            }
            case 2:{
                if(lang == 'EN'){
                    month = Dates.MARCH_ENGLISH
                }
                break;
            }
            case 3:{
                if(lang == 'EN'){
                    month = Dates.APRIL_ENGLISH
                }
                break;
            }
            case 4:{
                if(lang == 'EN'){
                    month = Dates.MAY_ENGLISH
                }
                break;
            }
            case 5:{
                if(lang == 'EN'){
                    month = Dates.JUNE_ENGLISH
                }
                break;
            }
            case 6:{
                if(lang == 'EN'){
                    month = Dates.JULY_ENGLISH
                }
                break;
            }
            case 7:{
                if(lang == 'EN'){
                    month = Dates.AUGUST_ENGLISH
                }
                break;
            }
            case 8:{
                if(lang == 'EN'){
                    month = Dates.SEPTEMBER_ENGLISH
                }
                break;
            }
            case 9:{
                if(lang == 'EN'){
                    month = Dates.OCTOBER_ENGLISH
                }
                break;
            }
            case 10:{
                if(lang == 'EN'){
                    month = Dates.NOVEMBER_ENGLISH
                }
                break;
            }
            case 11:{
                if(lang == 'EN'){
                    month = Dates.DECEMBER_ENGLISH
                }
                break;
            }
        }
        return month + ' ' + date.getDate() + ', ' + date.getFullYear()
    }


}