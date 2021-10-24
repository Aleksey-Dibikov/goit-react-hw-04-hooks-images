import PropTypes from 'prop-types';
// import React, { Component } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ modalImg, closeModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const backDropClick = event => {
    // console.log('click');
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
      <div className={s.Overlay} onClick={backDropClick}>
        <div className={s.Modal}>
          <img key={modalImg.id} src={modalImg.img} alt={modalImg.tags} />
        </div>
      </div>,
      modalRoot,
    );
};

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.closeModal();
//     }
//   };

//   backDropClick = event => {
//     // console.log('click');
//     if (event.target === event.currentTarget) {
//       this.props.closeModal();
//     }
//   };

//   render() {
//     const { modalImg } = this.props;
//     return createPortal(
//       <div className={s.Overlay} onClick={this.backDropClick}>
//         <div className={s.Modal}>
//           <img key={modalImg.id} src={modalImg.img} alt={modalImg.tags} />
//         </div>
//       </div>,
//       modalRoot,
//     );
//   }
// }

Modal.propTypes = {
  closeModal: PropTypes.func,
  modalImg: PropTypes.object,
};

export default Modal;
