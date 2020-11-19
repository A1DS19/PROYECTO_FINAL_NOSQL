import React from 'react';
import { useField } from 'formik';
import { Fragment } from 'react';

export const Field = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Fragment>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className='form-control' {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='alert alert-danger' role='alert'>
          {meta.error}
        </div>
      ) : null}
    </Fragment>
  );
};
