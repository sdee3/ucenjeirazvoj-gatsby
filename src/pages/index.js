import React from 'react';
import { Helmet } from 'react-helmet';
import { useMediaQuery } from 'react-responsive';
import Services from '../components/Services';

export default function Home() {
  const isMobile = useMediaQuery({ query: '(max-width: 769px)' });

  return (
    <>
      <Helmet>
        <title>Učenje i razvoj</title>
        <meta
          name="description"
          content="Učenje i razvoj - Edukativni centar koji svoj program ostvaruje kroz produženi boravak, radionice za decu, programi za lični rast i razvoj."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ucenjeirazvoj.com/" />
        <meta property="og:title" content="Učenje i razvoj" />
        <meta
          property="og:description"
          content="Učenje i razvoj - Edukativni centar koji svoj program ostvaruje kroz produženi boravak, radionice za decu, programi za lični rast i razvoj."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/sdee3-com/image/upload/v1600187912/ucenjeirazvoj/homepage-mobile.jpg"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ucenjeirazvoj.com/" />
        <meta property="twitter:title" content="Učenje i razvoj" />
        <meta
          property="twitter:description"
          content="Učenje i razvoj - Edukativni centar koji svoj program ostvaruje kroz produženi boravak, radionice za decu, programi za lični rast i razvoj."
        />
        <meta
          property="twitter:image"
          content="https://res.cloudinary.com/sdee3-com/image/upload/v1600187912/ucenjeirazvoj/homepage-mobile.jpg"
        />
      </Helmet>
      <section className="home-page">
        <section className="home-page__main-img">
          <img
            alt="Učenje i razvoj cover"
            src={
              isMobile
                ? 'https://res.cloudinary.com/sdee3-com/image/upload/v1600187912/ucenjeirazvoj/homepage-mobile.jpg'
                : 'https://res.cloudinary.com/sdee3-com/image/upload/v1600187912/ucenjeirazvoj/homepage.jpg'
            }
          />
        </section>
        <div className="container">
          <p>
            <span className="text__blue text__bold">
              CENTAR ZA UČENJE I RAZVOJ
            </span>{' '}
            je edukativni centar koji svoj program ostvaruje kroz sledeće
            aktivnosti:
          </p>
          <div className="service-category service-category__blue">
            <img
              alt="Produzeni boravak Novi Beograd - Ucenje i razvoj"
              src="https://res.cloudinary.com/sdee3-com/image/upload/v1605291865/ucenjeirazvoj/vece/usluge/produzeni-boravak.jpg"
            />
            <ul>
              <p className="text__blue text__bold">
                <li>
                  „ŠKOLICA ZA UČENJE I RAZVOJ“ - PROGRAM PRODUŽENOG BORAVKA ZA
                  DECU ŠKOLSKOG UZRASTA
                </li>
              </p>
            </ul>
            <p>
              Produženi boravak je otvoren za decu od I do IV razreda osnovne
              škole. Nalazi se na Novom Beogradu, preko puta hotela Hajat, pored
              OŠ "Jovan Dučić" i na desetak minuta udaljenosti OŠ "Laza Kostić".
              Program rada produženog boravka svakom detetu nudi mogućnost da na
              kvalitetan i zabavan način provede vreme, završi školske obaveze i
              učestvuje u različitim aktivnostima koje pozitivno utiču na
              kognitivni, emocionalni i socijalni razvoj. Ponuda produženog
              boravka u Centru za učenje i razvoj obuhvata: rad u malim grupama
              i individualni pristup; dovođenje dece iz škole/ odvođenje u
              školu; pomoć u pisanju domaćih zadataka i učenju školskog
              gradiva;kreativne i razvojne radionice (koncentracija, pamćenje,
              tehnike učenja, motivacija, samopouzdanje, emocinalna pismenost,
              socijalne veštine...); igranje i boravak na otvorenom; voćnu
              užinu.
            </p>
            <p>Nastojimo da:</p>
            <ul>
              <li>
                kod naših učenika razvijamo veštine razmišljanja,
                socijane/društvene veštine, veštine komunikacije, istraživačke i
                veštine upravljanja sobom
              </li>
              <li>
                naši programi budu vrednosno orjentisani kroz izgradnju ličnih
                stavova u odnosu na ljude, okolinu i sticanje znanja
              </li>
              <li>
                kod dece podstičemo razvoj zahvalnosti, posvećenosti,
                samopouzdanja, saradnje, kreativnosti, radoznalosti,
                saosećajnsti, entuzijazama, integriteta, poštovanja i
                tolerancije
              </li>
            </ul>
          </div>
          <div className="service-category service-category__green">
            <img
              className="img img__green"
              alt="Savetovaliste za decu Novi Beograd - Ucenje i razvoj"
              src="https://res.cloudinary.com/sdee3-com/image/upload/v1605291866/ucenjeirazvoj/vece/usluge/savetovaliste.jpg"
            />
            <ul>
              <p className="text__blue text__bold">
                <li>
                  SAVETOVALIŠTE “CENTAR ZA RAST I RAZVOJ” – PROGRAM PODRŠKE
                  LIČNOM RASTU I RAZVOJU DECE, RODITELJA I ODRASLIH
                </li>
              </p>
            </ul>
            <p>
              Savetovalište svoj program se realizuje u odnosu na uzrast u
              sledećim kategorijama:
            </p>
            <p>
              Deca predškolskog i školskog uzrasta: stidljivost, nedostatak
              samopouzdanja i samopoštovanja, prolazak kroz težak period života
              i određena traumatska iskustva, različiti strahovi, plačljivost,
              utučenost, slaba koncentracija, probleme u učenju, agresivno
              ponašanje, nesigurnost, bes, neuspeh u školi, strah od škole.
            </p>
            <p>
              <span className="text__blue text__bold">Roditelji:</span>{' '}
              pedagoška i psihološka edukacija o tome kako bolje razumeti
              određena dečija ponašanja, zašto se javljaju i šta oni, kao
              roditelji, mogu da urade kako bi olakšali svakodnevno
              funkcionisanje porodice. Cilj je da roditelji osveste koji
              postupci, od onih koje primenjuju, ne daju željene rezultate i
              kako ih zameniti novim i efikasnijim; Kako deci postaviti granice,
              definisati nagrade i kazne, prevazići “krizne” razvojne periode…
            </p>
            <p>
              <span className="text__blue text__bold">Mladi:</span>{' '}
              prevazilaženje kriza odrastanja, konflikata, odnosa sa drugima,
              partnerskih odnosa, problema u vezi; zastoja u školovanju;
            </p>
            <p>
              <span className="text__blue text__bold">Odrasli:</span>{' '}
              nezadovoljstvo, strah, strepnja, tuga, konflikti, prevladavanje
              stresa, fobije, fluktuacije raspoloženja, partnerski izazovi,
              nefunkcionalna uverenja, partnerski izazovi..
            </p>
            <p>
              Rad u savetovalištu baziran je na konceptima psihoterapijskog
              pravca transakciona analiza. U osnovi transakcione analize je
              teorija ličnosti zasnovana na pručavanju ego stanja i analizi
              transakcija, kao osnovnih jedinica komunikacije. Kao pomoćna
              sredsva u radu koristimo tehnike kognitivnog i bihejvioralnog
              savetovanja i terapije igrom.
            </p>
          </div>
          <div className="service-category service-category__yellow">
            <img
              alt="Program za rani podrska-licnom-rastu-i-razvoju Novi Beograd - Ucenje i razvoj"
              src="https://res.cloudinary.com/sdee3-com/image/upload/v1605291866/ucenjeirazvoj/vece/usluge/program-rani-razvoj.jpg"
            />
            <ul>
              <p className="text__blue text__bold">
                <li>
                  "CENTAR ZA RAZVOJ ŽIVOTNIH VEŠTINA" – PROGRAM ZA RANI RAZVOJ
                  SOCIJALNE I EMOCIONALNE INTELIGENCIJE I KOGNITIVNIH VEŠTINA
                </li>
              </p>
            </ul>
            <p>
              U okviru ovog programa organizujemo radionice za decu uzrasta od 4
              do 12 godina. Radionice obuhvataju različite teme vezane za
              kognitivni, socijalni i emocionalni aspekt dečijeg razvoja.
              Osmišljene su tako da odgovore na različite potrebe savremene
              porodice i da omoguće deci da kvalitetno provedu vreme u
              vršnjačkom okruženju razvijajući različite veštine. U ponudi imamo
              radionice pripreme za polazak u školu za predškolce, radionice za
              razvoj socijalne i emocionalne inteligencije i samopoštovanja,
              radionice za razvoj pažnje i koncentracije, razičitih tehnika
              učenja, asertivnosti, kreativnih potencijala…
            </p>
          </div>
        </div>
        <Services />
      </section>
    </>
  );
}
