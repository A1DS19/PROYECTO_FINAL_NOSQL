import React, { Fragment, useEffect } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../actions/index';
import { Link } from 'react-router-dom';
import Message from '../assets/Message';
import Loader from '../assets/Loader';

function MyOrders({ match }) {
  const userId = match.params.id;
  const orderList = useSelector((state) => state.orderList);
  const dispatch = useDispatch();

  const { orders, errorMessage } = orderList;

  useEffect(() => {
    dispatch(fetchOrders(userId));
  }, [dispatch, userId]);

  return (
    <Fragment>
      <Row>
        <Col md={12}>
          <h1>Mis Ordenes</h1>
          {!orders || orders.length === 0 ? (
            <Loader />
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DETALLE</th>
                  <th>FECHA</th>
                  <th>TOTAL</th>
                  <th>PAGADO</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>
                      {order.orderItems.map((x) => (
                        <Link
                          key={x.product}
                          to={`/product/${x.product}`}
                        >{`${x.title}, `}</Link>
                      ))}
                    </td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td>
                      <Link className='btn btn-primary btn-md' to={`/order/${order._id}`}>
                        DETALLES
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Fragment>
  );
}

export default MyOrders;
