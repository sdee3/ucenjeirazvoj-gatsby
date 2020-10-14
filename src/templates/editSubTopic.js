import React from 'react';
import { graphql, Link, navigate } from 'gatsby';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { isAuthenticated, validateCookie } from '../Helpers';
import { AlertContext } from '../components/Layout';
import Page404 from '../pages/404';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      article: {},
      originalTitle: '',
      originalSlug: '',
    };
  }

  componentDidMount() {
    const { data } = this.props;
    const { subtopic } = data.ucenjeirazvoj;

    this.setState({
      article: subtopic,
      originalTitle: subtopic.name,
      originalSlug: subtopic.slug,
    });
  }

  handleChange = (value) => {
    const { article } = this.state;
    this.setState({ article: { ...article, content: value } });
  };

  handleImage = () => {
    const input = document.createElement('input');
    const formData = new FormData();

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      formData.append('image', file, file.name);

      this.quill.getEditor().focus();
      // Save current cursor state
      const range = this.quill.getEditor().getSelection(true);

      // Move cursor to right side of image (easier to continue typing)
      this.quill.getEditor().setSelection(range.index + 1);

      // API POST, returns image location as string e.g. 'http://www.example.com/images/foo.png'
      axios.post('/api/img', formData).then((res) => {
        const imgUrl =
          typeof window !== 'undefined'
            ? window.location.origin + res.data
            : '';
        // Remove placeholder image
        this.quill.getEditor().deleteText(range.index, 1);

        // Insert uploaded image
        this.quill.getEditor().insertEmbed(range.index, 'image', imgUrl, 'api');
      });
    };
  };

  updateArticle = () => {
    const { article, originalSlug } = this.state;
    const setAlert = this.context;

    validateCookie()
      .then(() =>
        axios.put(`/api/tema/${originalSlug}`, article).then(() => {
          setAlert(
            'Tekst je uspešno ažuriran! Bićete vraćeni nazad za par sekundi...',
            'success'
          );

          setTimeout(() => {
            navigate(`/tema/${article.slug}`, { replace: true });
          }, 2500);
        })
      )
      .catch((err) => console.log(err));
    // setAlert(err.response.data.messages[0], "danger"));
  };

  render() {
    const { article, originalTitle } = this.state;

    return Object.keys(article).length && isAuthenticated() ? (
      <section className="blog-page container">
        <Link to={`/tema/${article.slug}`}>
          <button type="button" className="button btn-big">
            Go Back
          </button>
        </Link>
        <h1 className="h1-small">You are editing {originalTitle}:</h1>
        <section className="edit-article__inputs">
          <div className="edit-article__inputs--category-select">
            {/* <span>Category:</span>
              <section className='edit-article__category-checkboxes'>
                <Category
                  categories={categoriesContext.categories}
                  category_id={article.category_id}
                  handleRadioChange={handleRadioChange}
                />
              </section> */}
          </div>
          <input
            onChange={(e) =>
              this.setState({ article: { ...article, name: e.target.value } })
            }
            placeholder="Naslov"
            value={article.name ?? ''}
          />
          <input
            onChange={(e) =>
              this.setState({ article: { ...article, intro: e.target.value } })
            }
            placeholder="Podnaslov"
            value={article.intro ?? ''}
          />
          <input
            onChange={(e) =>
              this.setState({
                article: { ...article, img_url: e.target.value },
              })
            }
            placeholder="URL ka slici"
            value={article.img_url ?? ''}
          />
          <div className="input-group-prepend">
            <div className="input-group-prepend__pre-input-text">/tema/</div>
            <input
              onChange={(e) =>
                this.setState({ article: { ...article, slug: e.target.value } })
              }
              placeholder="URL ka tekstu (automatski počinje sa /tema/)"
              value={article.slug ?? ''}
            />
          </div>
          <ReactQuill
            ref={(r) => (this.quill = r)}
            formats={[
              'header',
              'bold',
              'italic',
              'underline',
              'strike',
              'blockquote',
              'color',
              'list',
              'bullet',
              'indent',
              'align',
              'link',
              'image',
            ]}
            modules={{
              toolbar: {
                container: [
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ color: [] }],
                  [
                    { list: 'ordered' },
                    { list: 'bullet' },
                    { indent: '-1' },
                    { indent: '+1' },
                  ],
                  [{ align: [] }],
                  ['link', 'image'],
                  ['clean'],
                ],
                handlers: { image: this.handleImage },
              },
            }}
            onChange={this.handleChange}
            defaultValue={article.content ?? ''}
          />
          <section className="text-center">
            <button
              className="button btn-big"
              onClick={this.updateArticle}
              type="button"
            >
              Save Changes
            </button>
          </section>
        </section>
      </section>
    ) : (
      <Page404 />
    );
  }
}

Edit.contextType = AlertContext;

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
          id
          name
        }
      }
    }
  }
`;

export default Edit;
