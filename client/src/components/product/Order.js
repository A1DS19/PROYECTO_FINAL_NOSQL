import '../css/auth.css';
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../assets/Message';
import { Link } from 'react-router-dom';
import { fetchOrderDetails, payOrder } from '../../actions/index';
import { instance as axios } from '../../actions/axiosConfig';
import { PayPalButton } from 'react-paypal-button-v2';
import Loader from '../assets/Loader';
import { ORDER_PAY_RESET } from '../../actions/types';
import { toast } from 'react-toastify';

function Order({ match }) {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      //Cuando script se cargue
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    dispatch({ type: ORDER_PAY_RESET });
    dispatch(fetchOrderDetails(orderId));

    if (order && !order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order]);

  const successPayment = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return (
    <Fragment>
      {order && (
        <Fragment>
          <h2 className='mt-2 mb-4'>Orden {order._id}</h2>
          <Row>
            <Col md={8}>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Email: </strong>
                  <a href={`mailto:${order.user.email}`} style={{ color: '#212529' }}>
                    {' '}
                    {order.user.email}
                  </a>
                </p>
                <p>
                  <strong>Direccion:</strong>
                  <br />
                  {order.shippingAddress.address}
                  <br />
                  {order.shippingAddress.city}
                  <br />
                  {order.shippingAddress.postalCode}
                  <br />
                  {order.shippingAddress.country}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Metodo de Pago</h2>
                <p>
                  <strong>Metodo: </strong>
                  {order.paymentMethod && order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message message={`Orden pagada el ${order.paidAt}`} type='success' />
                ) : (
                  <Message message={`Orden no pagada`} type='danger' />
                )}
              </ListGroup.Item>

              <ListGroupItem>
                <h2>Orden</h2>
                {order.orderItems.length === 0 ? (
                  <Message message='Orden vacia' type='primary' />
                ) : (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
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
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Total de Impuestos</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Precio Total a Pagar</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroupItem>
                  {!order.isPaid && (
                    <ListGroupItem>
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPayment}
                        />
                      )}
                    </ListGroupItem>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Order;
