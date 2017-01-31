function formatDate (date) {
  return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
}

function getMonthWord (month) {
  return ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev'][month]
}

module.exports = {
  formatDate,
  getMonthWord
}
