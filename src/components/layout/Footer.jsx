import { useNavigate } from 'react-router-dom'

import { useLoginMutation, useLogOutAllMutation } from '@account/api/accountApi'
import Button from '@ui/Button'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  const [login] = useLoginMutation()
  const [logOutAll] = useLogOutAllMutation()
  const navigate = useNavigate()

  let loginButtons
  {
    const handleLogin = async (username) => {
      await login({ username, password: '' })
      navigate('/saloon', { replace: true, state: { game: 'poka' } })
    }

    loginButtons = (
      <>
        <Button onClick={() => handleLogin('Machine')} prompt="Machine" />
        <Button onClick={() => handleLogin('Thanos')} prompt="Thanos" />
        <Button onClick={() => handleLogin('Koulis')} prompt="Koulis" />
        <Button onClick={() => logOutAll()} prompt="z" />
      </>
    )
  }

  return (
    <footer className="footer">
      {loginButtons}
      <p>Όροι χρήσης</p>|<p>Πολιτική απορρήτου</p>|<NavLink to="instructions">Οδηγίες</NavLink>
    </footer>
  )
}

export default Footer
