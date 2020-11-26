import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';

export default function Support() {
  return (
    <>
      <Helmet>
        <title>Usluge | Učenje i razvoj</title>
        <meta
          name="description"
          content="Usluge koje portal Učenje i razvoj pruža roditeljima, deci, kao i svim odraslima. Učenje i razvoj - Produženi boravak, radionice za decu, programi za lični rast i razvoj."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ucenjeirazvoj.com/" />
        <meta property="og:title" content="Učenje i razvoj" />
        <meta
          property="og:description"
          content="Usluge koje portal Učenje i razvoj pruža roditeljima, deci, kao i svim odraslima. Učenje i razvoj - Produženi boravak, radionice za decu, programi za lični rast i razvoj."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/sdee3-com/image/upload/v1589966037/ucenjeirazvoj/ucenjeirazvoj-main-txt.jpg"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ucenjeirazvoj.com/" />
        <meta property="twitter:title" content="Učenje i razvoj" />
        <meta
          property="twitter:description"
          content="Usluge koje portal Učenje i razvoj pruža roditeljima, deci, kao i svim odraslima. Učenje i razvoj - Produženi boravak, radionice za decu, programi za lični rast i razvoj."
        />
        <meta
          property="twitter:image"
          content="https://res.cloudinary.com/sdee3-com/image/upload/v1589966037/ucenjeirazvoj/ucenjeirazvoj-main-txt.jpg"
        />
      </Helmet>
      <section className="support-page">
        <div className="container">
          <h1>Usluge</h1>
          <Link to="/usluge/produzeni-boravak">
            <div className="text-center">
              <img
                className="img img__blue"
                alt="Produzeni boravak Novi Beograd - Ucenje i razvoj"
                src="https://res.cloudinary.com/sdee3-com/image/upload/v1605291865/ucenjeirazvoj/vece/usluge/produzeni-boravak.jpg"
              />
            </div>
          </Link>
          <Link to="/usluge/radionice-za-decu">
            <div className="text-center">
              <img
                className="img img__yellow"
                alt="Program za rani podrska-licnom-rastu-i-razvoju Novi Beograd - Ucenje i razvoj"
                src="https://res.cloudinary.com/sdee3-com/image/upload/v1605291866/ucenjeirazvoj/vece/usluge/program-rani-razvoj.jpg"
              />
            </div>
          </Link>
          <Link to="/usluge/podrska-licnom-rastu-i-razvoju">
            <div className="text-center">
              <img
                className="img img__green"
                alt="Savetovaliste za decu Novi Beograd - Ucenje i razvoj"
                src="https://res.cloudinary.com/sdee3-com/image/upload/v1605291866/ucenjeirazvoj/vece/usluge/savetovaliste.jpg"
              />
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
