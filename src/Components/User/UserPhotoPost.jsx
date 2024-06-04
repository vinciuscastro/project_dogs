import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PHOTO_POST } from '../../api';
import styles from './UserPhotoPost.module.css';
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import Error from '../Helper/Error'
import useForm from '../../Hooks/useForm';
import UseFetch from '../../Hooks/UseFetch';

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm('number');
  const idade = useForm('number');
  const [img, setImg] = React.useState({});
  const { data, error, loading, request } = UseFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);


  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);
    const token = localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options);
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }


  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit} action="">
        <Input type="text" name="nome" label="Nome" {...nome} />
        <Input type="number" name="peso" label="Peso" {...peso} />
        <Input type="number" name="idade" label="Idade" {...idade} />
        <Input className={styles.file} type="file" name="img" id="img" onChange={handleImgChange} />
        {loading ? <Button disabled>Enviando...</Button> : <Button>Enviar</Button>}
        <Error error={error} />
      </form>
      <div>
        {img.preview && <div
          className={styles.preview}
          style={{ backgroundImage: `url('${img.preview}')` }} />}
      </div>
    </section>
  );
};

export default UserPhotoPost;
