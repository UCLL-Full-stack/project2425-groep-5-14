import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { User } from '@/types';
import { getUserByUsername } from '@/service/userService';
import Language from '@/components/Language';

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUser = async () => {
      const fetchedUser = await getUserByUsername(localStorage.getItem('userName')!);
      console.log('Fetched user:', fetchedUser); // Debugging log

      setUser(fetchedUser);
    };

    fetchUser();
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
              {user?.role === 'admin' && (
                <li className="nav-item">
                  <Link href="/admin" className="nav-link">
                    Admin
                  </Link>
                </li>
              )}
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
        <Language />
      </nav>
    </header>
  );
};

export default Header;