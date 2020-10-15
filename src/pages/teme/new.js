import React from 'react';
import { Link, navigate } from 'gatsby';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { isAuthenticated, validateCookie } from '../../Helpers';
import { AlertContext } from '../../components/Layout';
import Page404 from '../404';
import Breadcrumbs from '../../components/Breadcrumbs';
import Topic from '../../components/Topic';

export default function AddTopic() {
  const [topic, setTopic] = React.useState({
    name: '',
    topic_id: 0,
    slug: '',
    intro: '',
    content: '',
  });
  const [parentTopics, setParentTopics] = React.useState([]);

  const quill = React.useRef(null);
  const setAlert = React.useContext(AlertContext);

  const handleImage = () => {
    const quillEditor = quill.current.getEditor();

    const input = document.createElement('input');
    const formData = new FormData();

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      formData.append('image', file, file.name);

      quillEditor.focus();
      // Save current cursor state
      const range = quillEditor.getSelection(true);

      // Move cursor to right side of image (easier to continue typing)
      quillEditor.setSelection(range.index + 1);

      // API POST, returns image location as string e.g. 'http://www.example.com/images/foo.png'
      axios.post('/api/img', formData).then((res) => {
        const imgUrl = `http://localhost:8001${res.data}`;
        console.log(imgUrl);
        // Remove placeholder image
        quillEditor.deleteText(range.index, 1);

        // Insert uploaded image
        quillEditor.insertEmbed(range.index, 'image', imgUrl, 'api');
      });
    };
  };

  const quillModules = {
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
      handlers: { image: handleImage },
    },
  };

  React.useEffect(() => {
    axios.get('/api/topics').then((res) => {
      setParentTopics(res.data);
    });
  }, []);

  const handleChange = (value) => {
    setTopic({ ...topic, content: value });
  };

  const submitArticle = () => {
    validateCookie()
      .then(() => {
        axios
          .post('/api/subtopics', topic)
          .then(() => {
            axios.post('/__refresh');
            setAlert(
              'Novi tekst je uspešno kreiran! Bićete vraćeni nazad za par sekundi...',
              'success'
            );

            setTimeout(() => {
              navigate('/teme');
            }, 2500);
          })
          .catch((err) => setAlert(err.response.data.message, 'danger'));
      })
      .catch(() => {
        alert(
          'Error validating the cookie. Click OK to be redirected to the login page'
        );
        navigate('/blog/admin');
      });
  };

  const handleRadioChange = (e) => {
    const newParentTopic = parentTopics.filter(
      (c) => c.name === e.target.value
    )[0];

    setTopic({ ...topic, topic_id: newParentTopic.id });
  };

  return isAuthenticated() ? (
    <>
      <Breadcrumbs
        page={
          <>
            <Link to="/teme">Teme</Link>
            <i className="material-icons">keyboard_arrow_right</i>
            <Link to="/teme/new">Novi tekst</Link>
          </>
        }
      />
      <section className="blog-page blog-page__add-article container">
        <h1>Novi tekst</h1>
        <form
          className="add-article__form"
          onSubmit={(e) => {
            e.preventDefault();
            submitArticle();
          }}
        >
          <div className="edit-article__inputs--category-select">
            <span>Tema:</span>
            <section className="edit-article__category-checkboxes">
              <Topic
                topics={parentTopics}
                handleRadioChange={handleRadioChange}
              />
            </section>
          </div>
          <input
            onChange={(e) => setTopic({ ...topic, name: e.target.value })}
            placeholder="Naslov"
            defaultValue={topic.name ?? ''}
          />
          <input
            onChange={(e) => setTopic({ ...topic, intro: e.target.value })}
            placeholder="Podnaslov"
            defaultValue={topic.intro ?? ''}
          />
          <input
            onChange={(e) => setTopic({ ...topic, img_url: e.target.value })}
            placeholder="URL ka slici"
            defaultValue={topic.img_url ?? ''}
          />
          <div className="input-group-prepend">
            <div className="input-group-prepend__pre-input-text">/tema/</div>
            <input
              onChange={(e) => setTopic({ ...topic, slug: e.target.value })}
              placeholder="URL ka tekstu (automatski počinje sa /tema/)"
              defaultValue={topic.slug ?? ''}
            />
          </div>
          <ReactQuill
            ref={quill}
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
            modules={quillModules}
            onChange={handleChange}
            value={topic.content}
          />
          <input className="button" type="submit" value="Sačuvaj novi tekst" />
        </form>
      </section>
    </>
  ) : (
    <Page404 />
  );
}
