import React from 'react';
import { navigate } from 'gatsby';
import axios from 'axios';
import { createCookie, fetchCookie } from '../../Helpers';

export default function AdminLogin() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    const currentUrl = window !== 'undefined' ? window.location.pathname : '';

    if (fetchCookie('x-auth').length) {
      alert('Već ste ulogovani! Redirekcija nazad...');
      navigate(currentUrl.replace('/admin', ''), { replace: true });
    }
  }, []);

  const login = () => {
    const currentUrl = window !== 'undefined' ? window.location.pathname : '';

    axios
      .post('/api/admin-login', { username, password })
      .then((res) => {
        createCookie('x-auth', res.headers['x-auth']);
        alert('Uspešna autorizacija!');
        navigate(currentUrl.replace('/admin', ''), { replace: true });
      })
      .catch((err) => {
        alert(err.response.data);
        setUsername('');
        setPassword('');
      });
  };

  return (
    <section className="blog-page__login-form container">
      <h1>You are not authorized to modify this section.</h1>
      <h2>Please login:</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(username, password);
        }}
      >
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Korisničko ime"
          type="text"
          value={username}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Lozinka"
          type="password"
          value={password}
        />
        <input className="button" type="submit" value="Pošalji" />
      </form>
    </section>
  );
}
