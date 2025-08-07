import { useNavigate } from 'react-router';

import { useLogOutAllMutation } from 'poka/api/pokaApi';
import { useLoginMutation } from 'account/api/accountApi';
import Button from 'ui/Button';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const [login] = useLoginMutation();
  const [logOutAll] = useLogOutAllMutation();
  const navigate = useNavigate();

  let loginButtons;
  {
    const handleLogin = async username => {
      await login({ username, password: '' });
      navigate('/saloon');
    };

    loginButtons = (
      <>
        <Button onClick={() => handleLogin('Machine')} prompt="Machine" />
        <Button onClick={() => handleLogin('Thanos')} prompt="Thanos" />
        <Button onClick={() => handleLogin('Koulis')} prompt="Koulis" />
        <Button onClick={() => logOutAll()} prompt="z" />
      </>
    );
  }

  return (
    <div className="footer">
      {loginButtons}
      <p>Όροι χρήσης</p>|<p>Πολιτική απορρήτου</p>|
      <NavLink to="instructions">Οδηγίες</NavLink>
    </div>
  );
};

export default Footer;
