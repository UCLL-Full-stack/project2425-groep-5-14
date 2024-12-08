import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link href="/" className="navbar-brand">
          Game Hub
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/games" className="nav-link">
              Games
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link href="/profile" className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-item logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link href="/login" className="nav-link">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;