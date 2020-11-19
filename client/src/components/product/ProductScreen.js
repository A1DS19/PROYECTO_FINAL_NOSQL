import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { fetch_product, addToWishlist } from '../../actions/index';
import { toast } from 'react-toastify';

function ProductScreen({ match, history }) {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const productId = match.params.id;

  const product = useSelector((state) => state.product_detail);
  const productDetail = product.product.product;

  const auth = useSelector((state) => state.auth);
  const { currentUser } = auth;

  useEffect(() => {
    dispatch(fetch_product(productId));
  }, [productId, dispatch]);

  const addToCart = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  const addToWishlistHandler = (id, wishlistItems, status) => {
    dispatch(addToWishlist(id, wishlistItems, status));
    toast.success('Producto agregado a wishlist');
  };

  return (
    <Fragment>
      <Link className='btn btn-primary my-3' to='/'>
        Volver
      </Link>
      {productDetail && (
        <Row>
          <Col md={6}>
            <Image src={productDetail.imagePath} alt={productDetail.title} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4>{productDetail.title}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                Precio: ${productDetail.price}{' '}
                <i
                  style={{ cursor: 'pointer', color: 'red' }}
                  onClick={() =>
                    addToWishlistHandler(currentUser.id, productDetail, true)
                  }
                  className='fas fa-heart'
                ></i>
              </ListGroup.Item>
              <ListGroup.Item>{productDetail.description}</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Precio:</Col>
                    <Col>
                      {' '}
                      <strong>${productDetail.price}</strong>{' '}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Estado:</Col>
                    <Col>
                      {productDetail.countInStock && productDetail.countInStock > 0
                        ? 'Disponible'
                        : 'Agotado'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {productDetail.countInStock && productDetail.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Cantidad</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(productDetail.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCart}
                    className='btn-block'
                    type='button'
                    disabled={productDetail.countInStock === 0}
                  >
                    Agregar a Carrito
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Fragment>
  );
}

export default ProductScreen;
