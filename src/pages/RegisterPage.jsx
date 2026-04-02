import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import FormRegister from '../components/FormRegister';
import RegisterFeedback from '../components/RegisterFeedback';

function RegisterPage() {
  const methods = useForm({
    defaultValues: {
      fullName: '',
      gender: '',
      birthday: '',
      email: '',
      password: ''
    }
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [notif, setNotif] = useState('');
  const navigate = useNavigate();

  const handlerClickRegister = (data) => {
    if (data.password === confirmPassword) {
      try {
        setStatus('loading');
        setNotif('Sedang menyimpan data...');

        const stored = JSON.parse(localStorage.getItem('listUser')) || [];

        const updateListUser = [...stored, data];

        localStorage.setItem('listUser', JSON.stringify(updateListUser));

        // simulasi simpan data (3 detik)
        setTimeout(() => {
          setStatus('success');
          setNotif('Data berhasil disimpan');
        }, 1500);
      } catch {
        setNotif('Gagal menyimpan');
      }
    }
  };

  // auto close notif sukses
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        setStatus('idle');
        navigate('/login');
      }, 2000);

      return () => clearTimeout(timer);
    }
    else if (notif === 'Gagal menyimpan') {
      const timer = setTimeout(() => {
        setStatus('idle');
        navigate('/register');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [navigate, status, notif]);

  return (
    <section className='container-register'>
      <div className="form-register">
        <div className="caption-register">
          <h3>Selamat Bergabung</h3>
          <p>Yuk buat akun Jaga Sehat agar sehat anda terjaga</p>
        </div>

        <FormProvider {...methods}>
          <FormRegister
            password={methods.getValues('password')}
            handlerClickRegister={methods.handleSubmit(handlerClickRegister)}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword} />
        </FormProvider>

        <div className="does-have-account">
          <p>Sudah punya akun? <Link to={'/login'}>Klik untuk masuk</Link></p>
        </div>
      </div>

      <RegisterFeedback status={status} notif={notif} />
    </section>
  );
}

export default RegisterPage;