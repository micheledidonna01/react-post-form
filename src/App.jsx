import axios from "axios";
import { useEffect, useState } from "react"
// import axios from "axios";

const initialFormBook = {
  author: '',
  title: '',
  body: '',
  public: false,
};

function App() {

  let api = 'https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts';

  const [library, setLibrary] = useState([]);
  const [formBook, setFormBook] = useState(initialFormBook);

  function fetchLibrary(){
    axios.get(api)
    .then((res) => {
      setLibrary(res.data);
    })
    .catch(err => console.log(err))
  }

  function handleFormData(e){
    const value =
          e.target.type === 'checkbox' ?
          e.target.checked : e.target.value;
    setFormBook((formBook) => ({
      ...formBook,
      [e.target.name] : value
    }));
    
  }

  function handleSubmit(e){
    e.preventDefault();
    // setMenu((menu) => [...menu, { id: Date.now(), ...formData }]);
    setLibrary([...library, formBook]);
    setFormBook(initialFormBook);
    
  }

  useEffect(fetchLibrary, []);

  useEffect(()=>{
    console.log(library);
  }, [library])
  
  return (
    <>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="section-form">
            <label htmlFor="author">Author:</label>
            <input type="text"
              className="form"
              value={formBook.author}
              onChange={handleFormData}
              name="author"
            />
          </div>
          <div className="section-form">
            <label htmlFor="title">Title:</label>
            <input type="text"
              className="form"
              value={formBook.title}
              onChange={handleFormData}
              name="title"
            />
          </div>
          <div className="section-form">
            <label htmlFor="body">Body:</label>
            <input type="text"
              className="form"
              value={formBook.body}
              onChange={handleFormData}
              name="body"
            />
          </div>
          <div className="section-form">
            <input type="checkbox"
              className="form"
              value={formBook.public}
              onChange={handleFormData}
              name="public"
            />
          </div>
          <button className="btn btn-outline-primary">Send Form</button>
        </form>
      </div>
    </>
  )
}

export default App
