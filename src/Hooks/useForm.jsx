import { func } from 'prop-types'
import React from 'react'


const types = {
  email: {
    regex: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    message: 'Preencha um e-mail válido.'
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
    message: 'A senha precisa ter 1 caracter maiúsculo, 1 minúsculo e 1 digito. Com no mínimo 6 caracteres e no máximo 20.'
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize números apenas.'
  }
}


const useForm = (type) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);

  function validate(value) {
    if (type === false) return true;
    if (value.length === 0) {
      setError('Preencha um valor.')
      return false
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null)
      return true
    }
  }

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  return (
    {
      value, setValue, onChange, validate: () => validate(value), onBlur: () => validate(value), error
    }
  )
}

export default useForm;