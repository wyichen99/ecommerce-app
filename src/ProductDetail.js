import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './cartContext';
import { Container, Row, Col, Card, Carousel, Button } from 'react-bootstrap';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${productId}`)
      .then(res => {
        setProduct(res.data);
      })
      .catch(error => console.error("Failed to fetch product details:", error));
  }, [productId]);

  if (!product) {
    return <div className="text-center mt-5"><h3>Loading...</h3></div>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <Card>
            <Carousel interval={null}>
              {product.images.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={img}
                    alt={`Slide ${index}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>

            <Card.Body class="card-body1">
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                <strong>Description:</strong> {product.description}
              </Card.Text>
              <Card.Text>
                <strong>Price:</strong> ${product.price}
              </Card.Text>
              <Card.Text>
                <strong>Brand:</strong> {product.brand}
              </Card.Text>
              <Card.Text >
                <strong>Rating:</strong> {product.rating} / 5
              </Card.Text>
              <Button className="mt-auto" variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;