import AV from '../libs/AV.js'
import moment from '../libs/moment.min.js'
import Temperature from '../model/temperature.js'

// get data of target month and previous month
function getMonthData (request) {
  let date = new Date(request.year, request.month)
  let startDate = moment(date).subtract(1, 'months').startOf('month').toDate()
  let endDate = moment(date).endOf('month').toDate()
  let startQuery = new AV.Query(Temperature).equalTo('userId', request.userId).greaterThanOrQqualTo('createdAt', startDate)
  let endQuery = new AV.Query(Temperature).equalTo('userId', request.userId).lessThan('createAt', endDate)
  return new AV.Query.and(startQuery, endQuery).descending('createdAt').find()
}

function addTemperature (request) {
  return new Temperature({
    temperature: request.temperature,
    inPeriod: request.inPeriod,
    note: request.note,
    user: AV.User.current()
  }).save()
}

module.exports = {
  addTemperature,
  getMonthData
}
