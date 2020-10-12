import axios from "axios";

const createCookie = (cookieName, cookieValue, daysToExpire) => {
  const date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  document.cookie =
    cookieName + "=" + cookieValue + "; expires=" + date.toGMTString();
};

const fetchCookie = cookieName => {
  let name = cookieName + "=";
  let allCookieArray = document.cookie.split(";");

  for (let i = 0; i < allCookieArray.length; i++) {
    let temp = allCookieArray[i].trim();

    if (temp.indexOf(name) === 0) {
      return temp.substring(name.length, temp.length);
    }
  }

  return "";
};

const isAuthenticated = () => {
  return fetchCookie("x-auth").length > 0;
};

const validateCookie = () => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/validate-cookie", { cookie: fetchCookie("x-auth") })
      .then(res => resolve(res.data))
      .catch(err => reject(err.response));
  });
};

const validateArticle = article => {
  return new Promise((resolve, reject) => {
    if (article.title.length) {
      if (article.caption.length) {
        if (article.slug.length) {
          if (article.content.length) {
            if (article.cover_url.length) {
              return resolve();
            } else {
              reject("Missing cover image URL in the form!");
            }
          } else {
            reject("Missing content in the form!");
          }
        } else {
          reject("Missing slug in the form!");
        }
      } else {
        reject("Missing caption in the form!");
      }
    } else {
      reject("Missing title in the form!");
    }
  });
};

const areInputsValid = (name, email, message) => {
  if (name.length) {
    if (email.length) {
      let re = /\S+@\S+\.\S+/;
      if (re.test(email)) {
        if (message.length) {
          return true;
        } else {
          return "Polje sa porukom je obavezno! Molimo pokušajte ponovo.";
        }
      } else {
        return "Email adresa nije ispravna! Molimo pokušajte ponovo.";
      }
    } else {
      return "Email adresa je obavezna4! Molimo pokušajte ponovo.";
    }
  } else {
    return "Polje sa imenom je obavezno! Molimo pokušajte ponovo.";
  }
};

export {
  areInputsValid,
  isAuthenticated,
  fetchCookie,
  createCookie,
  validateCookie,
  validateArticle,
};
