import React from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { graphql, Link, navigate } from 'gatsby';
import { isAuthenticated, validateCookie } from '../Helpers';
import Breadcrumbs from '../components/Breadcrumbs';

export default function SubTopic(props) {
  const [article, setArticle] = React.useState({});
  const [parentTopic, setParentTopic] = React.useState('');

  React.useEffect(() => {
    const { subtopic } = props.data.ucenjeirazvoj;

    setArticle(subtopic);
    setParentTopic(subtopic.topic.name);
  }, [props]);

  // React.useEffect(() => {
  //   if (match.params.slug !== "new") {
  //     axios
  //       .get(`/api/tema/${match.params.slug}`)
  //       .then(res => {
  //         setArticle(res.data);
  //         setParentTopic(res.data.topic.name);
  //       })
  //       .catch(err => console.error(err.response));
  //   }
  // }, []);

  const deleteArticle = () => {
    if (window?.confirm('Are you sure you want to delete this text?')) {
      validateCookie()
        .then(() =>
          axios
            .delete(`/api/tema/${article.slug}`)
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

  return article ? (
    <>
      <Helmet>
        <title>{`${article.name} | Učenje i razvoj`}</title>
        <meta
          name="description"
          content={
            article.intro ? article.intro : `${article.title} | Učenje i razvoj`
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ucenjeirazvoj.com/" />
        <meta
          property="og:title"
          content={`${article.name} | Učenje i razvoj`}
        />
        <meta
          property="og:description"
          content={
            article.intro ? article.intro : `${article.title} | Učenje i razvoj`
          }
        />
        <meta property="og:image" content={article.img_url} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ucenjeirazvoj.com/" />
        <meta
          property="twitter:title"
          content={`${article.name} | Učenje i razvoj`}
        />
        <meta
          property="twitter:description"
          content={
            article.intro ? article.intro : `${article.title} | Učenje i razvoj`
          }
        />
        <meta property="twitter:image" content={article.img_url} />
      </Helmet>
      <Breadcrumbs
        page={
          <>
            <Link to="/teme">Teme</Link>
            <i className="material-icons">keyboard_arrow_right</i>
            <Link to={`/tema/${article.slug}`}>{article.name}</Link>
          </>
        }
      />
      <section className="blog-page container">
        <section className="blog-post">
          {isAuthenticated() ? (
            <div className="blog-post__top-buttons">
              <a
                href={`${process.env.GATSBY_API_URL}/tema/${article.slug}/edit`}
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
          <h1 className="blog-post__title">{article.name}</h1>
          <section className="blog-post__author-category">
            <span className="label">{parentTopic}</span>
            <span className="article-author" />
          </section>
          {article.intro ? (
            <section className="blog-post__intro">{article.intro}</section>
          ) : null}
          {article.img_url ? (
            <div className="blog-post__cover-img">
              <img alt={article.name} src={article.img_url} />
            </div>
          ) : null}
          <section
            className="blog-post__text"
            dangerouslySetInnerHTML={{ __html: article.content }}
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
