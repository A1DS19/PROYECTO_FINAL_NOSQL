import React from 'react';

function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }
  return (
    <div>
      <div className='alert alert-danger' role='alert'>
        {message}
      </div>
    </div>
  );
}

export default ErrorMessage;
