import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout, fetch_currentUser } from '../../actions/index';

export const Navbar = ({ signout, fetch_currentUser }) => {
  const auth = useSelector((state) => state.auth);
  const { authenticated, currentUser } = auth;

  useEffect(() => {
    if (!currentUser) {
      fetch_currentUser();
    }
  });

  const links = [
    !authenticated && { label: 'Registro', href: '/auth/signup' },
    !authenticated && { label: 'Iniciar Sesion', href: '/auth/signin' },
    authenticated && {
      label: 'Carrito',
      href: '/cart',
      icon: 'fas fa-shopping-cart',
    },
    authenticated &&
      currentUser && {
        label: 'Mis Ordenes',
        href: `/myorders/${currentUser.id}`,
        icon: 'fas fa-shopping-basket',
      },
    authenticated &&
      currentUser && {
        label: 'WishList',
        href: `/wishlist/${currentUser.id}`,
        icon: 'fas fa-heart',
      },
    authenticated &&
      currentUser && {
        label: currentUser.email,
        href: `/myprofile/${currentUser.id}`,
        icon: 'fas fa-address-card',
      },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href, icon }) => {
      return (
        <li className='nav-item active' key={href}>
          <Link to={href} className='nav-link'>
            {icon && <i className={`${icon} ml-1 mr-1`}></i>}
            {label}
          </Link>
        </li>
      );
    });

  const signOut = () => {
    signout();
  };

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <Link className='navbar-brand' to='/'>
          NoSQL
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse  justify-content-end' id='navbarNav'>
          <ul className='navbar-nav'>
            {links}
            {authenticated && (
              <li className='nav-item active'>
                <Link to='/' className='nav-link' onClick={signOut}>
                  Salir
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return { authenticated: auth.authenticated, currentUser: auth.currentUser };
};

export default connect(mapStateToProps, { signout, fetch_currentUser })(Navbar);
