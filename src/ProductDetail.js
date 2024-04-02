import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './cartContext';
import { Container, Row, Col, Card, Carousel, Button } from 'react-bootstrap';

function ProductDetail() {
  // Use the useParams hook to access the dynamic parts of the route defined in the URL (productId in this case)
  const { productId } = useParams();

  // State for storing the product details
  const [product, setProduct] = useState(null);

  // Access the addToCart function from the cart context
  const { addToCart } = useCart();

  // Fetch product details from the API when the component mounts or when productId changes
  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${productId}`)
      .then(res => {
        // Set the product state to the fetched data
        setProduct(res.data);
      })
      .catch(error => {
        // Log an error if the request fails
        console.error("Failed to fetch product details:", error);
      });
  }, [productId]);

  // Show a loading message while the product data is being fetched
  if (!product) {
    return <div className="text-center mt-5"><h3>Loading...</h3></div>;
  }

  // Render the product details within a container
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <Card>
            {/* Carousel to display product images */}
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

            {/* Card body containing the product information */}
            <Card.Body className="card-body1">
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                {/* Product description */}
                <strong>Description:</strong> {product.description}
              </Card.Text>
              <Card.Text>
                {/* Product price */}
                <strong>Price:</strong> ${product.price}
              </Card.Text>
              <Card.Text>
                {/* Product brand */}
                <strong>Brand:</strong> {product.brand}
              </Card.Text>
              <Card.Text>
                {/* Product rating */}
                <strong>Rating:</strong> {product.rating} / 5
              </Card.Text>
              {/* Button to add the product to the cart */}
              <Button className="mt-auto" variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;