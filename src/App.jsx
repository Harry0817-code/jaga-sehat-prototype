import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { GetUserLogged } from './utils/StorageUserLogin.js';

import Navigations from "./components/Navigations.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ListDoctorPage from './pages/ListDoctorPage.jsx';
import DetailDoctorPage from './pages/DetailDoctorPage.jsx';
import MessagePage from './pages/MessagePage.jsx';
import CheckBMICalculatorPage from './pages/CheckBMICalculatorPage.jsx';

function App() {
  const [role, setRole] = useState({});
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function fetchUserLogged() {
      setLoading(true);

      setRole(prev => ({ ...prev, role: GetUserLogged() }));

      setInitializing(false);
      setLoading(false);
    }

    fetchUserLogged();
  }, [])

  if (initializing) {
    return null;
  }

  if (loading) {
    return <p>Loading...</p>
  }

  const routeConfig = {
    user: [
      { path: "/", element: <HomePage /> },
      { path: "/list-doctors", element: <ListDoctorPage /> },
      { path: "/list-doctors/:id", element: <DetailDoctorPage /> },
      { path: "/message/:id", element: <MessagePage /> },
      { path: "/check-ideal", element: <CheckBMICalculatorPage /> },
    ],
    guest: [
      { path: "/", element: <LandingPage /> },
      { path: "/login", element: <LoginPage setRole={setRole} setLoading={setLoading} /> },
      { path: "/register", element: <RegisterPage /> },
    ]
  };
  const isRole = role?.role || "guest";
  const setRoute = routeConfig[isRole];

  return (
    <>
      <header>
        <Navigations role={isRole} setRole={setRole} setLoading={setLoading} />
      </header>
      <main>
        <Routes>
          {setRoute.map((ele, idx) => (
            <Route key={idx} path={ele.path} element={ele.element} />
          ))}
          <Route path="/*" element={<p>404 | Not Found</p>} />
        </Routes>
      </main>
    </>
  )
}

export default App
