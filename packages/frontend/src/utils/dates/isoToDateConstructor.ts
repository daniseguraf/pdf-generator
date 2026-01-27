export const isoToDateConstructor = (isoString: Date) => {
  const date = new Date(isoString)

  const newDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  )

  return newDate
}
