import React from 'react'
import styles from './FeedPhotosItem.module.css'
import Imagem from '../Helper/Imagem';

const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  function handleClick() {
    setModalPhoto(photo);
  }
  return (
    <li className={styles.photo} onClick={handleClick}>
      <Imagem src={photo.src} alt={photo.title} />
      <span className={styles.view}>{photo.acessos}</span>
    </li>
  )
}

export default FeedPhotosItem