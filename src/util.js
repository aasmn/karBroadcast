export default {
    getNextDayMilliseconds(){
        var now = new Date()
        var nextDay = new Date();
        nextDay.setDate(now.getDate() + 1)
        nextDay.setHours(2)
        nextDay.setMinutes(0)
        nextDay.setMinutes(0)
        return nextDay - now
    }
}