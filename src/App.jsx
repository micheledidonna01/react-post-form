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
    if(formBook.author && formBook.body && formBook.title){
      alert('Libro aggiunto con successo!');
      setLibrary([...library, formBook]);
    }else{
      alert('Devi inserire tutti i campi')
    }
    setFormBook(initialFormBook);
    
  }

  useEffect(fetchLibrary, []);

  useEffect(()=>{
    console.log(library);
  }, [library])
  
  return (
    <>
      <div className="container mx-auto d-flex align-items-center">
        <form className="form d-flex row wrap gap-2" onSubmit={handleSubmit}>
          <div className="form-floating">
            <input type="text"
              className="form-control"
              value={formBook.author}
              onChange={handleFormData}
              name="author"
              placeholder="insert Author"
            />
            <label htmlFor="author" className="">Name of Author</label>
          </div>
          <div className="form-floating">
            <input type="text"
              className="form-control"
              value={formBook.title}
              onChange={handleFormData}
              name="title"
              placeholder="insert Title of book"
            />
            <label htmlFor="title">Title of Book</label>
          </div>
          <div className="form-floating">
            <input type="text"
              className="form-control"
              value={formBook.body}
              onChange={handleFormData}
              name="body"
              placeholder="insert Note of book"
            />
            <label htmlFor="body">Note of Book</label>
          </div>
          <div className="section-form">
            <input type="checkbox"
              className="form-check-input"
              value={formBook.public}
              onChange={handleFormData}
              name="public"
            />
            <label htmlFor="public" className="form-check-label text-white">Public</label>
          </div>
          <button className="btn btn-outline-primary text-white">Send Form</button>
        </form>
      </div>
    </>
  )
}

export default App
