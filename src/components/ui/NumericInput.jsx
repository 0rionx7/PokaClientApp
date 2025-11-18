import { useGameBuilderContext } from '@poka/components/gameBuilder/useGameBuilderContext'
import './NumericInput.scss'

const NumericInput = ({ name, className }) => {
  const { values, setFieldValue } = useGameBuilderContext()

  const handleIncrement = () => {
    setFieldValue([name], values[name] + 1)
  }

  const handleDecrement = () => {
    if (values[name] - 1 < 1) return
    setFieldValue([name], values[name] - 1)
  }

  return (
    <div className={`container ${className}`}>
      <button type="button" style={{ backgroundColor: 'green' }} onClick={handleIncrement}>
        {'+'}
      </button>
      <div className="form-control" style={{ justifyContent: 'center', fontSize: '0.6rem' }}>
        <input
          type="number"
          readOnly
          value={values[name]}
          style={{ height: '100%', width: ' 2rem' }}
        />
        ΧΑΡΤΙ{values[name] !== 1 && 'Α'}
      </div>
      <button type="button" style={{ backgroundColor: '#d10000' }} onClick={handleDecrement}>
        {'-'}
      </button>
    </div>
  )
}

export default NumericInput
