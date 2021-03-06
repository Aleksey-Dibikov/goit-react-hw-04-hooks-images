// import { Component } from 'react';
import { useState, useEffect } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import apiServices from './services/apiServices';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Spinner from './components/Loader/Loader';

//  import { ToastContainer } from 'react-toastify';

import './App.css';

function App() {
  const [status, setStatus] = useState('init');
  const [valueApi, setValueApi] = useState('');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');

  useEffect(() => {  
    if (!valueApi) { return;}

    if (page === 1) {
      setStatus('pending');

      apiServices(valueApi, page)
        .then(query => query.hits)
        .then(query => setQuery(query), setStatus('resolved'));
    }

    if (page > 1) {
      setStatus('pending');

      apiServices(valueApi, page)
        .then(query => query.hits)
        .then(query => {
          return (
            setQuery([...query, ...query]),
            setStatus('resolved'),
            window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
            })
          )
        }
      );
    }
  }, [valueApi, page])

  const handleFormSubmit = value => {
    setValueApi(value);
    setPage(1);
  };

  const btnLoadMore = () => {
    setPage(page + 1);
    setStatus('pending');
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const FindModalImg = (id, img, tags) => {
    setModalImg({ id: id, img: img, tags: tags })
  };

  return (
      <div className="App">
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery
          query={query}
          toggleModal={toggleModal}
          bigImg={FindModalImg}
        />
        {status === 'pending' && <Spinner />}
        {query.length > 0 && <Button onClick={btnLoadMore} />}
        {showModal && <Modal closeModal={toggleModal} modalImg={modalImg} />}
        {/* <ToastContainer/> */}
      </div>
    );
}

// class App extends Component {
//   state = {
//     status: 'init',
//     valueApi: '',
//     page: 1,
//     query: [],
//     showModal: false,
//     modalImg: '',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { valueApi, page, query } = this.state;

//     if (prevState.valueApi !== valueApi) {
//       this.setState({ status: 'pending' });

//       apiServices(valueApi, page)
//         .then(query => query.hits)
//         .then(query => this.setState({ query: query, status: 'resolved' }));
//     }

//     if (prevState.page !== page && page !== 1) {
//       this.setState({ status: 'pending' });

//       apiServices(valueApi, page)
//         .then(query => query.hits)
//         .then(query =>
//           this.setState(prevState => ({
//             query: [...prevState.query, ...query],
//             status: 'resolved',
//           })),
//         );
//     }

//     if (prevState.query !== query) {
//       window.scrollTo({
//         top: document.documentElement.scrollHeight,
//         behavior: 'smooth',
//       });
//     }
//   }

//   handleFormSubmit = value => {
//     this.setState({
//       valueApi: value,
//       page: 1,
//     });
//   };

//   btnLoadMore = () => {
//     const { page } = this.state;
//     this.setState({
//       page: page + 1,
//       status: 'pending',
//     });
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   FindModalImg = (id, img, tags) => {
//     this.setState({ modalImg: { id: id, img: img, tags: tags } });
//   };

//   render() {
//     const { handleFormSubmit, toggleModal, FindModalImg, btnLoadMore } = this;
//     const { query, status, showModal, modalImg } = this.state;
//     return (
//       <div className="App">
//         <Searchbar onSubmit={handleFormSubmit} />
//         <ImageGallery
//           query={query}
//           toggleModal={toggleModal}
//           bigImg={FindModalImg}
//         />
//         {status === 'pending' && <Spinner />}
//         {query.length > 0 && <Button onClick={btnLoadMore} />}
//         {showModal && <Modal closeModal={toggleModal} modalImg={modalImg} />}
//         {/* <ToastContainer/> */}
//       </div>
//     );
//   }
// }

export default App;
