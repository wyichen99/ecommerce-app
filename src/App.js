import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axios is used for API requests
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, Navbar, Nav, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CartPage from './cartPage';
import { useCart } from './cartContext';
import ProductDetail from './ProductDetail';
import LoginForm from './LoginForm';
function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const { addToCart } = useCart();

  useEffect(() => {
    if (!token) return; // Execute the following code only if token exists

    axios.get('https://dummyjson.com/products')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => console.error('Error fetching products:', error));

    axios.get('https://dummyjson.com/products/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, [token]); 

  useEffect(() => {
    let url = 'https://dummyjson.com/products';
    if (selectedCategory) {
      url += `/category/${encodeURIComponent(selectedCategory)}`;
    }
    axios.get(url)
      .then(response => {
        const filteredProducts = response.data.products;
        const finalProducts = searchQuery ? filteredProducts.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())) : filteredProducts;
        setProducts(finalProducts);
      })
      .catch(error => console.error('Error fetching products by category:', error));
  }, [selectedCategory, searchQuery]); // Run this effect on category or search query changes

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setToken(null); // Update the state to reflect that the user is logged out
  };

  if (!token) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">My E-Commerce App</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link as={Link} to="/cart">
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
              <DropdownButton variant="secondary" title={selectedCategory || "Select Category"} className="ms-2">
                <Dropdown.Item onClick={() => setSelectedCategory('')}>All Categories</Dropdown.Item>
                {categories.map((category, index) => (
                  <Dropdown.Item key={index} onClick={() => setSelectedCategory(category)}>
                    {category}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search by name"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form>
            {token && (
              <Button variant="outline-light" onClick={handleLogout} className="ms-2">
                <i className="fas fa-sign-out-alt"></i> Logout
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/" element={
            <Row xs={1} md={2} lg={4} className="g-4">
              {products.map((product) => (
                <Col key={product.id}>
                  <Card className="h-100 shadow-sm bg-white rounded">
                    <Link to={`/product/${product.id}`} className="text-dark text-decoration-none">
                      <Card.Img variant="top" src={product.thumbnail} alt={product.title} />
                      <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>${product.price}</Card.Text>
                        <button variant="primary" onClick={() => addToCart(product)}>Add to Cart</button>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          } />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;