import React from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Navbar from './Navbar';
import Footer from './Footer';
import Alert from './Alert';

const CategoriesContext = React.createContext();
const AlertContext = React.createContext();

export default function Layout({ children }) {
  const [categories, setCategories] = React.useState([]);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertState, setAlertState] = React.useState('');

  React.useEffect(() => {
    axios
      .get('/api/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err.response));
  }, []);

  const setAlert = (message, state) => {
    setAlertMessage(message);
    setAlertState(state);

    setTimeout(() => {
      setAlertMessage('');
      setAlertState('');
    }, 2500);
  };

  const updateCategories = (categories) => setCategories(categories);

  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
          integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
          crossOrigin="anonymous"
        />
        <link
          href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
          rel="stylesheet"
        />
      </Helmet>
      <AlertContext.Provider value={setAlert}>
        <CategoriesContext.Provider value={{ categories, updateCategories }}>
          <Navbar />
          <Alert alertMessage={alertMessage} alertState={alertState} />
          {children}
          <Footer />
        </CategoriesContext.Provider>
      </AlertContext.Provider>
    </>
  );
}

export { AlertContext, CategoriesContext };
