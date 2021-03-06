function formatDate(date) {
  const d = new Date(date)
  const year = d.getFullYear()
  let month = d.getMonth() + 1
  let day = d.getDate()

  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }

  return [year, month, day].join('-')
}

export default formatDate
