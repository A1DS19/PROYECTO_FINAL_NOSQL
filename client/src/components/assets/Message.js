import React from 'react';

function ErrorMessage({ message, type }) {
  return (
    <div>
      <div className={`alert alert-${type}`} role='alert'>
        {message}
      </div>
    </div>
  );
}

export default ErrorMessage;
