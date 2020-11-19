import '../css/auth.css';
import React, { Fragment } from 'react';
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../assets/Message';
import CheckOutSteps from '../assets/CheckOutSteps';
import { Link } from 'react-router-dom';
import { createOrder } from '../../actions/index';

function PlaceOrder({ history }) {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  cart.taxPrice = Number((0.13 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = Number(cart.itemsPrice + cart.taxPrice);

  const placeOrder = () => {
    dispatch(
      createOrder(
        {
          orderItems: cart.cartItems,
          user: user.id,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod.paymentMethod,
          itemsPrice: cart.itemsPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        (id) => {
          history.push(`/order/${id}`);
        }
      )
    );
  };

  return (
    <Fragment>
      <CheckOutSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
              <strong>Direccion:</strong>
              <br />
              {cart.shippingAddress.address}
              <br />
              {cart.shippingAddress.city}
              <br />
              {cart.shippingAddress.postalCode}
              <br />
              {cart.shippingAddress.country}
            </p>
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Metodo de Pago</h2>
            <strong>Metodo: </strong>
            {cart.paymentMethod.paymentMethod && cart.paymentMethod.paymentMethod}
          </ListGroup.Item>

          <ListGroupItem>
            <h2>Orden</h2>
            {cart.cartItems.length === 0 ? (
              <Message message='Carrito vacio' type='primary' />
            ) : (
              <ListGroup variant='flush'>
                {cart.cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.imagePath} alt={item.title} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.title}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>Resumen de Orden</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total de Impuestos</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Precio Total a Pagar</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.items === 0}
                  onClick={placeOrder}
                >
                  Completar Pedido
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}

export default PlaceOrder;
