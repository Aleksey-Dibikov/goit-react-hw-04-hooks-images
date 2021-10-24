import PropTypes from 'prop-types';
// import React, { Component } from 'react';
import s from './ImageGalleryItem.module.css';


const ImageGalleryItem = ({ webformatURL, tags, toggleModal, bigImg }) => {
  return (
      <li className={s.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          className={s.ImageGalleryItemImage}
          onClick={() => {
            toggleModal();
            bigImg();
          }}
        />
      </li>
    );
}
// class ImageGalleryItem extends Component {
//   render() {
//     const { webformatURL, tags, toggleModal, bigImg } = this.props;
//     return (
//       <li className={s.ImageGalleryItem}>
//         <img
//           src={webformatURL}
//           alt={tags}
//           className={s.ImageGalleryItemImage}
//           onClick={() => {
//             toggleModal();
//             bigImg();
//           }}
//         />
//       </li>
//     );
//   }
// }

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  toggleModal: PropTypes.func,
  bigImg: PropTypes.func,
};

export default ImageGalleryItem;
