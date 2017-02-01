function formatDate (date) {
  return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
}

function getMonthWord (month) {
  return ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev'][month]
}

function temperatureRecordsToBarData (temperatureRecords) {
  let values = temperatureRecords.filter(r => r.temperature).map(r => r.temperature)
  let max = 39
  let min = 36
  /*
  if (values.length === 0) {
    max = 39
    min = 36
  } else if (values.length === 1) {
    max = values[0] * 1.1
    min = values[0] * .9
  } else {
    max = Math.max(...values)
    min = Math.min(...values)
  }
  */

  function _map (from, to, value) {
    return from + (value - min) * (to - from) / (max - min)
  }

  console.log('max', max, 'min', min)
  return temperatureRecords.map((r, i) => {
    return {
      id: r.id,
      value: r.temperature ? _map(10, 90, r.temperature) : 0,
      label: i + 1
    }
  })
}

module.exports = {
  formatDate,
  getMonthWord,
  temperatureRecordsToBarData
}
