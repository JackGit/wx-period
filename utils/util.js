function formatDate (date) {
  return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
}

function getMonthWord (month) {
  return ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev'][month]
}

function temperatureRecordsToBarData (temperatureRecords) {
  let max = Math.max(...temperatureRecords.map(r => r.temperature))
  let min = Math.min(...temperatureRecords.filter(r => r.temperature).map(r => r.temperature))

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
