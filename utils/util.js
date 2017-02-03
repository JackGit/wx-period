function formatDate (date) {
  return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
}

function getMonthWord (date) {
  let thisYear = new Date().getFullYear()
  let year = date.getFullYear()
  let month = (date.getMonth() + 1) + '月' // ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'][month] + '月'
  return thisYear === year ? month : year + ' ' + month 
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

function createTempRecord (id, date) {
  return {
    id: id || 'temp' + Date.now(),
    temperature: null,
    inPeriod: false,
    //periodDate: 0,
    //periodDays: 0,
    date: date,
    dateString: formatDate(date),
    monthWord: getMonthWord(date),
    note: '',
    temp: true
  }
}

function findIndexById (temperatureRecords, id) {
  let index = -1
  for (let i = 0; i < temperatureRecords.length; i++) {
    if (temperatureRecords[i].id === id) {
      index = i
      break
    }
  }
  return index
}

function getBetweenColor (startColor, stopColor, weight) {
    let p = weight
    let w = p * 2 - 1
    let w1 = (w / 1 + 1) / 2
    let w2 = 1 - w1
    let rgb
    let returnHex = false

    if (typeof startColor === 'string') { // hex to rgb
      startColor = hexToRgb(startColor)
      startColor = [startColor.r, startColor.g, startColor.b]
      returnHex = true
    }
    if (typeof stopColor === 'string') { // hex to rgb
      stopColor = hexToRgb(stopColor)
      stopColor = [stopColor.r, stopColor.g, stopColor.b]
    }

    rgb = [
      Math.round(startColor[0] * w2 + stopColor[0] * w1),
      Math.round(startColor[1] * w2 + stopColor[1] * w1),
      Math.round(startColor[2] * w2 + stopColor[2] * w1)
    ]

    if (returnHex) {
      return rgbToHex(rgb[0], rgb[1], rgb[2])
    } else {
      return rgb
    }
}

function hexToRgb (hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

module.exports = {
  formatDate,
  getMonthWord,
  temperatureRecordsToBarData,
  createTempRecord,
  findIndexById,
  getBetweenColor
}
