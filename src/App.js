import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming axios is used for API requests
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Form, Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
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

  if (!token) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">My E-Commerce App</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
        </Nav>
        <Form inline>
          <Form.Control
            type="text"
            placeholder="Search by name"
            className="mr-sm-2"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form>
        <DropdownButton id="dropdown-basic-button" title={selectedCategory || "Select Category"}>
          <Dropdown.Item onClick={() => setSelectedCategory('')}>All Categories</Dropdown.Item>
          {categories.map((category, index) => (
            <Dropdown.Item key={index} onClick={() => setSelectedCategory(category)}>
              {category}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Navbar>
      
      <Routes>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/" element={
          <Container>
            <Row>
              {products.map(product => (
                <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                  
                  <Card>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card.Img variant="top" src={product.thumbnail}  className="product-image"/>
                    </Link>
                    <Card.Body className="card-body">
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>${product.price}</Card.Text>
                      
                      <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </Card.Body>
                  </Card>
                  
                </Col>
              ))}
            </Row>
          </Container>
        } />
      </Routes>
    </Router>
  );
}

export default App;