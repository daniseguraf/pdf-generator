export const dayPropGetter = (date: Date) => {
  const dayOfWeek = date.getDay() // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

  // Si el día NO está en daysAvailable, deshabilítalo visualmente
  if (!daysAvailable.includes(dayOfWeek)) {
    return {
      className: 'disabled-day',
      style: {
        backgroundColor: '#f5f5f5',
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    }
  }
  return {}
}
