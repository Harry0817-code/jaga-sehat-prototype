import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { SaveUserLogged } from '../utils/StorageUserLogin';

import FormLogin from '../components/FormLogin';

function LoginPage(props) {
  const methods = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const { setRole, setLoading } = props;
  const navigate = useNavigate();

  const handlerLogin = () => {
    setLoading(true);
    const getListUser = JSON.parse(localStorage.getItem('listUser'));
    const dataUserLogin = getListUser?.find(record => record.email === methods.getValues('email'));

    if (dataUserLogin?.password === methods.getValues('password')) {
      SaveUserLogged(dataUserLogin);

      setRole(prev => ({ ...prev, role: 'user' }));
      setLoading(false);
      navigate('/');
    }
    else {
      console.log('Belum berhasil masuk');
      alert('Mohon daftar terlebih dahulu sebelum masuk ke prototype jaga sehat :)');
      setLoading(false);
    }
  }

  return (
    <section className='container-login'>
      <div className="form-login">
        <div className="caption-login">
          <h3>Selamat Datang</h3>
          <p>Yuk masuk akun Jaga Sehat anda</p>
        </div>

        <FormProvider {...methods}>
          <FormLogin handlerLogin={methods.handleSubmit(handlerLogin)} />
        </FormProvider>
      </div>
    </section>
  );
}

export default LoginPage;