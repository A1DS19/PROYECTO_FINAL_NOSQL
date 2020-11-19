import '../css/auth.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { Field } from '../assets/Field';
import Spinner from '../assets/Spinner';
import Loader from '../assets/Loader';
import ErrorMessage from '../assets/ErrorMessage';
import { toast } from 'react-toastify';
import { updateUserData } from '../../actions/index';
import { updateValidationSchema } from './updateSchema';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

function UpdateUserData({ match }) {
  const userId = match.params.id;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { currentUser } = auth;

  return !currentUser ? (
    <Loader />
  ) : (
    <Formik
      initialValues={{
        email: currentUser.email,
        name: currentUser.name,
        lastName: currentUser.lastName,
      }}
      validationSchema={updateValidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        dispatch(
          updateUserData(userId, values, () => {
            resetForm({});
            setSubmitting(false);
            toast.success('Datos personales actualizados con exito');
          })
        );
      }}
    >
      {({ dirty, isValid, isSubmitting, values }) => (
        <ListGroup className='mt-4'>
          <h1>Modificar Datos Personales</h1>
          <Form className='mt-1'>
            <ListGroupItem>
              <div className='form-group'>
                <Field
                  className='form-control'
                  label='Email'
                  name='email'
                  type='text'
                  placeholder='Digite su email'
                  value={values.email}
                />
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div className='form-group'>
                <Field
                  className='form-control'
                  label='Nombre'
                  name='name'
                  type='text'
                  value={values.name}
                  placeholder='Digite su nombre'
                />
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div className='form-group'>
                <Field
                  className='form-control'
                  label='Apellido'
                  name='lastName'
                  type='text'
                  value={values.lastName}
                  placeholder='Digite su apellido'
                />
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <button
                disabled={!dirty || !isValid}
                type='submit'
                className='btn btn-primary btn-block'
              >
                {isSubmitting ? <Spinner /> : 'Submit'}
              </button>
            </ListGroupItem>
          </Form>
        </ListGroup>
      )}
    </Formik>
  );
}

export default UpdateUserData;
