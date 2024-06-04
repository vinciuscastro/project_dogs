import React from 'react'
import styles from './PhotoDelete.module.css'
import { PHOTO_DELETE } from '../../api';
import UseFetch from '../../Hooks/UseFetch';

const PhotoDelete = ({ id }) => {
  const { loading, request } = UseFetch();

  async function handleCLick() {
    const confirm = window.confirm('Tem certeza que deseja deletar?');
    if (!confirm) return;
    const { url, options } = PHOTO_DELETE(id);
    const { response } = await request(url, options);
    if (response.ok) window.location.reload();
  }


  return (
    <>
      {loading ? (<button className={styles.delete} disabled>Deletando...</button>) : (<button onClick={handleCLick} className={styles.delete}>Deletar</button>)}
    </>
  )
}

export default PhotoDelete