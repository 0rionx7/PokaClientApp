import { useGetPokaStateQuery, useRenewCavaMutation } from '@poka/api/pokaApi'
import { formatNumber } from '@utils/helper-functions'
import useSnackBar from '@hooks/useSnackBar'
import Button from '@ui/Button'

const RenewOptions = () => {
  const [renew, { isSuccess, isLoading }] = useRenewCavaMutation()
  const { snackElement, setSnackInfo } = useSnackBar()
  const {
    data: { cava }
  } = useGetPokaStateQuery()

  const handleRenew = async (amount) => {
    const result = await renew({ amount })
    if (result.error?.data) setSnackInfo(result.error.data)
  }

  const amounts = [0.2 * cava, 0.5 * cava, 0.8 * cava, cava]

  return (
    <>
      <div className="renew-options">
        {snackElement}
        {amounts.map((amoount) => (
          <Button
            key={amoount}
            prompt={formatNumber(amoount)}
            onClick={() => handleRenew(amoount)}
            disabled={isLoading || isSuccess}
            className="green"
          />
        ))}
      </div>
    </>
  )
}

export default RenewOptions
