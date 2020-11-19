import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../assets/Loader';
import { Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { getWishlist, delItemWishlist } from '../../actions/index';
import { Link } from 'react-router-dom';
import Message from '../assets/Message';
import { toast } from 'react-toastify';

function MyWishlist({ match }) {
  const userId = match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlist(userId));
  }, [dispatch, userId]);

  const wishlistData = useSelector((state) => state.wishlist);
  const { wishlist, errorMessage, loading } = wishlistData;

  const removeFromWishlist = (productid) => {
    dispatch(delItemWishlist(userId, productid));
    toast.success('Item removido de wishlist');
  };

  const renderWishlist = () => {
    let items;
    if (wishlist && !loading && !errorMessage) {
      items = wishlist.data?.wishlistItems.map((item) => (
        <ListGroupItem key={item._id}>
          <Row>
            <Col md={3}>
              <Image src={item.imagePath} alt={item.title} fluid rounded />
            </Col>
            <Col md={3}>
              <Link to={`/product/${item._id}`}>{item.title}</Link>
            </Col>
            <Col md={3}>
              <p className='mt-3'>{`$${item.price}`}</p>
            </Col>
            <Col md={3}>
              <i
                style={{ cursor: 'pointer', color: 'red' }}
                onClick={() => removeFromWishlist(item._id)}
                className={
                  item.status === false ? 'far fa-heart mt-3' : 'fas fa-heart mt-3'
                }
              ></i>
            </Col>
          </Row>
        </ListGroupItem>
      ));
    }

    if (loading && !wishlist) {
      items = <Loader />;
    }

    if (wishlist?.data?.wishlistItems.length === 0) {
      console.log(wishlist);
      items = <Message message='Debe agregar items a su wishlist' type='info' />;
    }
    return items;
  };

  return (
    <div>
      <ListGroup variant='flush'>
        <h1>Wishlist</h1>
        {renderWishlist()}
      </ListGroup>
    </div>
  );
}

export default MyWishlist;
