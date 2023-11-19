import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { useLoginMutation } from 'src/features/authSlice/useLoginMutation';
import { logout } from 'src/features/authSlice/authSlice';
import Button from 'src/components/ui/Button';

const Footer = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginButtons = (
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
  const loginHandler = async username => {
    dispatch(logout());
    await login({ username, password: '' });
    navigate('/saloon');
  };
  return (
    <div className="footer">
      {loginButtons}
      <p>Όροι χρήσης</p>|<p>Πολιτική απορρήτου</p>|<p>Cookies</p>
    </div>
  );
};

export default Footer;
