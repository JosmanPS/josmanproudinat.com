import { parseISO, format } from 'date-fns'

type Props = {
  dateString: string
}

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString)
  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]
  return (
    <time dateTime={dateString}>
      {`${meses[date.getMonth()]} ${date.getDate()}, ${date.getUTCFullYear()}`}
    </time>
  )
}

export default DateFormatter
