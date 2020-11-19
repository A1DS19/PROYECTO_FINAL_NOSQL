import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function CheckOutSteps({ step1, step2, step3 }) {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>Pagar</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Pagar</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>Hacer Pedido</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Hacer Pedido</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default CheckOutSteps;
