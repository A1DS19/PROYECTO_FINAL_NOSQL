import React from 'react';

function Footer() {
  return (
    <div>
      <footer id='sticky-footer' className='py-4 bg-primary text-white'>
        <div className='container text-center'>
          © {new Date().getFullYear()} Copyright:
          <p> Curso NoSQL U.Fidelitas</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
