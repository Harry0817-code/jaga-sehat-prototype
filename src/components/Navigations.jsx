import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartHandshake, LogOut } from 'lucide-react';

function Navigations(props) {
  const { role, setRole, setLoading } = props;
  const navigate = useNavigate();

  const linkConfig = {
    user: [
      { to: "/", className: 'nav-general', menu: 'Beranda' },
      { to: "/list-doctors", className: 'nav-general', menu: 'Daftar Dokter' },
      { to: "/check-ideal", className: 'nav-general', menu: 'Cek Berat Ideal' },
    ], guest: [
      { to: "/login", className: 'nav-general', menu: 'Masuk' },
      { to: "/register", className: 'nav-specific', menu: 'Daftar' },
    ]
  };
  const setMenu = linkConfig[role];

  const handlerLogout = () => {
    setLoading(true);
    setRole(prev => ({ ...prev, role: 'guest' }));

    localStorage.removeItem('dataUserLogin');
    localStorage.removeItem('idUserLogin');

    setLoading(false);
    navigate('/login');
  }

  return (
    <>
      <div className="logo-header">
        <Link to="/">
          <span><HeartHandshake style={{ width: '1.8rem', height: '1.8rem' }} /></span>
          <p>Jaga Sehat</p>
        </Link>
      </div>
      <div className="menu-nav">
        {setMenu.map((ele, idx) => (
          <Link key={idx} to={ele.to} className={ele.className}>{ele.menu}</Link>
        ))}
        {role === 'user' &&
          <div className="icon-logout" onClick={handlerLogout}>
            <LogOut />
          </div>
        }
      </div>
    </>
  );
}

export default Navigations;