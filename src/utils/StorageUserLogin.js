import { v4 as uuidV4 } from 'uuid';

const SaveUserLogged = (dataUserLogin) => {
  const idLogin = uuidV4();
  const userLogin = Array.isArray(dataUserLogin)
    ? dataUserLogin.map(record => ({ ...record, id: idLogin }))
    : { ...dataUserLogin, id: idLogin };

  localStorage.setItem('dataUserLogin', JSON.stringify(userLogin));
  localStorage.setItem('idUserLogin', idLogin);
};

const GetUserLogged = () => {
  const user = JSON.parse(localStorage.getItem('dataUserLogin'));
  const userId = localStorage.getItem('idUserLogin');

  const isLoggedIn = user && userId && user.id === userId;
  const role = isLoggedIn ? 'user' : 'guest'
  
  return role;
}

export { SaveUserLogged, GetUserLogged }