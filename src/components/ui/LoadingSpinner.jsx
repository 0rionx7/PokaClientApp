import './LoadingSpinner.scss'

const LoadingSpinner = ({ centered, color }) => {
  const style = { borderColor: `${color || 'aqua'} transparent` }

  return <div className={`spinner${centered ? ' centered' : ''}`} style={style} />
}

export default LoadingSpinner
