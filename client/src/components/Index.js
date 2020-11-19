import React, { useEffect } from 'react';
import { fetch_products } from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Index({ fetch_products, products, history }) {
  useEffect(() => {
    fetch_products();
  }, [fetch_products]);

  return (
    <div className='row mt-5'>
      {products.products &&
        products.products.map(({ title, description, imagePath, price, _id }) => (
          <div className='col mb-3' key={_id}>
            <div className='card' style={{ width: '18rem' }}>
              <Link to={`/product/${_id}`} style={{ color: 'inherit' }}>
                <img className='card-img-top' src={imagePath} alt={title} />
              </Link>
              <div className='card-body'>
                <Link
                  to={`/product/${_id}`}
                  style={{ color: 'inherit', textDecorationColor: '#007bff' }}
                >
                  <h5 className='card-title text-uppercase'>{title}</h5>
                </Link>
                <p className='card-text description'>{`${description.substring(
                  0,
                  100
                )}...`}</p>
                <div className='price mb-1'>{`Precio: $${price}`}</div>
                <Link to={`/cart/${_id}?qty=${1}`} className='btn btn-primary btn-block'>
                  <i className='fas fa-cart-plus'></i> Agregar
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
const mapStateToProps = ({ products }) => {
  return { products: products.products };
};

export default connect(mapStateToProps, { fetch_products })(Index);
