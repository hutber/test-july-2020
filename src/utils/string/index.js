export const orderProducts = function(data, fieldName = 'name') {
  return data.sort((a, b) => {
    const nameA = a[fieldName].toUpperCase()
    const nameB = b[fieldName].toUpperCase()
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
  })
}
