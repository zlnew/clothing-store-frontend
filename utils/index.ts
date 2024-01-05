function slugify (str: string) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

function isNewReleasedProduct (dateString: string) {
  const inputDate = new Date(dateString)
  const currentDate = new Date()
  const timeDifference = currentDate.getTime() - inputDate.getTime()
  const monthsDifference = timeDifference / (1000 * 60 * 60 * 24 * 30) as number
  return monthsDifference < 30
}

function Rp (number?: number | null) {
  const formattedNumber = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number || 0)

  return formattedNumber
}

export {
  slugify,
  isNewReleasedProduct,
  Rp
}
