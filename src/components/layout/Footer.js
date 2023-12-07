import { useNavigate } from 'react-router';

import { useLoginMutation } from 'features/account/accountApi';
import Button from 'components/ui/Button';

const Footer = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  let loginButtons;
  {
    const loginHandler = async username => {
      await login({ username, password: '' });
      navigate('/saloon');
    };
    loginButtons = (
      <>
        <Button onClick={() => loginHandler('Machine')} prompt="Machine" />
        <Button onClick={() => loginHandler('Thanos')} prompt="Thanos" />
        <Button onClick={() => loginHandler('Koulis')} prompt="Koulis" />
        <Button onClick={() => loginHandler('alela')} prompt="alela" />
        <Button onClick={() => loginHandler('Doc')} prompt="Doc" />
        <Button onClick={() => loginHandler('q')} prompt="q" />
        <Button onClick={() => loginHandler('a')} prompt="a" />
        <Button onClick={() => loginHandler('z')} prompt="z" />
      </>
    );
  }

  return (
    <div className="footer">
      {loginButtons}
      <p>Όροι χρήσης</p>|<p>Πολιτική απορρήτου</p>|<p>Cookies</p>
    </div>
  );
};

export default Footer;
