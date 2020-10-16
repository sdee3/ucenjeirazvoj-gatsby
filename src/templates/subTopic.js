/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { graphql, Link, navigate } from 'gatsby';
import { isAuthenticated, validateCookie } from '../Helpers';
import Breadcrumbs from '../components/Breadcrumbs';

export default function SubTopic(props) {
  const deleteArticle = () => {
    if (window?.confirm('Are you sure you want to delete this text?')) {
      validateCookie()
        .then(() =>
          axios
            .delete(
              `${process.env.GATSBY_API_URL}/api/tema/${props.data.ucenjeirazvoj.subtopic.slug}`
            )
            .then(() => navigate('/teme'))
        )
        .catch(() => {
          alert(
            'Error validating the cookie. Click OK to be redirected to the login page'
          );
          navigate('/teme/admin');
        });
    }
  };

  const { subtopic } = props.data.ucenjeirazvoj;
  const parentTopicName = subtopic.topic.name;

  return subtopic ? (
    <>
      <Helmet>
        <title>{`${subtopic.name} | Učenje i razvoj`}</title>
        <meta
          name="description"
          content={
            subtopic.intro
              ? subtopic.intro
              : `${subtopic.title} | Učenje i razvoj`
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ucenjeirazvoj.com/" />
        <meta
          property="og:title"
          content={`${subtopic.name} | Učenje i razvoj`}
        />
        <meta
          property="og:description"
          content={
            subtopic.intro
              ? subtopic.intro
              : `${subtopic.title} | Učenje i razvoj`
          }
        />
        <meta property="og:image" content={subtopic.img_url} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ucenjeirazvoj.com/" />
        <meta
          property="twitter:title"
          content={`${subtopic.name} | Učenje i razvoj`}
        />
        <meta
          property="twitter:description"
          content={
            subtopic.intro
              ? subtopic.intro
              : `${subtopic.title} | Učenje i razvoj`
          }
        />
        <meta property="twitter:image" content={subtopic.img_url} />
      </Helmet>
      <Breadcrumbs
        page={
          <>
            <Link to="/teme">Teme</Link>
            <i className="material-icons">keyboard_arrow_right</i>
            <Link to={`/tema/${subtopic.slug}`}>{subtopic.name}</Link>
          </>
        }
      />
      <section className="blog-page container">
        <section className="blog-post">
          {isAuthenticated() ? (
            <div className="blog-post__top-buttons">
              <a
                href={`${process.env.GATSBY_API_URL}/tema/${subtopic.slug}/edit`}
              >
                <button className="button" type="button">
                  Izmeni tekst
                </button>
              </a>
              <button className="button" onClick={deleteArticle} type="button">
                Obriši tekst
              </button>
            </div>
          ) : null}
          <h1 className="blog-post__title">{subtopic.name}</h1>
          <section className="blog-post__author-category">
            <span className="label">{parentTopicName}</span>
            <span className="article-author" />
          </section>
          {subtopic.intro ? (
            <section className="blog-post__intro">{subtopic.intro}</section>
          ) : null}
          {subtopic.img_url ? (
            <div className="blog-post__cover-img">
              <img alt={subtopic.name} src={subtopic.img_url} />
            </div>
          ) : null}
          <section
            className="blog-post__text"
            dangerouslySetInnerHTML={{ __html: subtopic.content }}
          />
        </section>
      </section>
    </>
  ) : null;
}

export const query = graphql`
  query($slug: String!) {
    ucenjeirazvoj {
      subtopic(slug: $slug) {
        name
        intro
        content
        slug
        img_url
        topic {
          name
        }
      }
    }
  }
`;
