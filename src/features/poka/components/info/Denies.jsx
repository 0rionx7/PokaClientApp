import { useGetPokaStateQuery } from '@poka/api/pokaApi'
import { COUNT_FEM } from '@utils/text-constants'

const Denies = () => {
  const {
    data: { denials }
  } = useGetPokaStateQuery()

  if (!denials) return null

  return (
    <>
      {'με '}
      <span>{`${COUNT_FEM[denials]}  ΑΡΝΗΣ${denials > 1 ? 'ΕΙΣ ' : 'Η '}`}</span>
    </>
  )
}

export default Denies
