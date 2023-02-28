import React from 'react';
import Cookies from 'universal-cookie';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function NavBar({ user }) {
  const cookies = new Cookies();
  const { logout } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();

  // ------ handlers
  const isActive = (path) => (location.pathname === path ? 'font-black text-green-700 dark:text-green-900' : '');

  const handleLogout = () => {
    cookies.remove('jat');
    logout();
  };

  return (
    <Navbar fluid rounded className='py-5 border-b'>
      <div className='container flex flex-wrap items-center justify-between mx-auto'>
        <Navbar.Brand href='/'>
          <img src='/logo.png' alt='Covid Logo' className='mr-3 h-6 sm:h-9' />
          <span className='self-center whitespace-nowrap text-xl font-poppins font-bold dark:text-white'>
            Covid Tracker
          </span>
        </Navbar.Brand>
        <div className='flex md:order-2'>
          <Navbar.Toggle />
          <Dropdown
            inline
            arrowIcon={false}
            label={<Avatar rounded className='font-serif' alt='user profile' img={user?.picture} />}
          >
            <Dropdown.Header>
              <span to='/app/profile' className='font-serif block text-sm text-gray-900 dark:text-white'>
                {user?.user_metadata?.name}
              </span>
              <span className='font-serif block text-sm font-medium text-gray-500 truncate dark:text-gray-400'>
                {user?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item className='font-serif' onClick={() => navigate('/app/profile')}>
              Profile
            </Dropdown.Item>
            <Dropdown.Item className='font-serif' onClick={handleLogout}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        </div>
        <Navbar.Collapse>
          <Link className={`font-serif dark:text-white ${isActive('/app/check')}`} to='/app/check'>
            Covid Check
          </Link>
          <Link className={`font-serif dark:text-white ${isActive('/app/dashboard')}`} to='/app/dashboard'>
            Dashboard
          </Link>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
