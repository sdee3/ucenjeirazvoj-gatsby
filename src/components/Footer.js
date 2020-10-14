import React from 'react';
import Contact from './Contact';

export default function Footer() {
  return (
    <>
      <Contact />
      <section className="footer">
        <div className="container">
          Copyright &copy; 2020 Učenje i razvoj. Sva prava zadržana.
        </div>
      </section>
    </>
  );
}
