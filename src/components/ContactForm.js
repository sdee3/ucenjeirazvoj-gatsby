import React from 'react';
import axios from 'axios';
import { areInputsValid } from '../Helpers';
import { AlertContext } from './Layout';

export default function Form() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const setAlert = React.useContext(AlertContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validInputs = areInputsValid(name, email, message);

    if (validInputs === true) {
      axios
        .post(`${process.env.GATSBY_API_URL}/api/contact`, {
          name,
          email,
          message,
        })
        .then((res) => {
          if (res.status === 200) {
            setName('');
            setEmail('');
            setMessage('');

            setAlert(res.data, 'success');
          }
        })
        .catch(() => {
          setAlert('Greška prilikom slanja poruke!', 'danger');
        });
    } else {
      setAlert(validInputs, 'danger');
    }
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <input
        id="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        type="text"
        placeholder="Ime"
        value={name}
      />

      <input
        id="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="email"
        placeholder="Email"
        value={email}
      />

      <textarea
        id="message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        className="textMargin input"
        placeholder="Poruka"
        rows="10"
        value={message}
      />

      <input className="button" type="submit" value="Pošalji" />
    </form>
  );
}
