import { COUNT } from '@utils/text-constants'

import { useGetPokaStateQuery } from '@poka/api/pokaApi'

const Hats = () => {
  const { data } = useGetPokaStateQuery()

  const { hats, obligation } = data

  if (!hats) return null

  return (
    <div>
      με <span>{COUNT[hats]}</span> {'καπέλο '}
      {obligation ? <span> ΥΠΟΧΡΕΩΣΗ</span> : ''}
    </div>
  )
}

export default Hats
