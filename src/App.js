import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axios for HTTP requests
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for styling
import {
  Container, Row, Col, Card,
  Form, Navbar, Nav, Dropdown,
  DropdownButton, Button
} from 'react-bootstrap'; // React-bootstrap components
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // React Router for routing
import CartPage from './cartPage'; // Cart page component
import { useCart } from './cartContext'; // Cart context for state management
import ProductDetail from './ProductDetail'; // Product details component
import LoginForm from './LoginForm'; // Login form component

function App() {
  // State hooks for products, categories, and user authentication
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Use cart context to access addToCart function
  const { addToCart } = useCart();

  // Fetch all products and categories when component mounts or token changes
  useEffect(() => {
    if (!token) return; // Only fetch data if the user is authenticated (token is present)

    // Fetch products from the API
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => console.error('Error fetching products:', error));

    // Fetch product categories from the API
    axios.get('https://dummyjson.com/products/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, [token]);

  // Fetch products by category or name search query
  useEffect(() => {
    let url = 'https://dummyjson.com/products';
    if (selectedCategory) {
      // If a category is selected, append it to the URL
      url += `/category/${encodeURIComponent(selectedCategory)}`;
    }
    
    // Fetch products based on category or search query
    axios.get(url)
      .then(response => {
        const filteredProducts = response.data.products.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setProducts(filteredProducts);
      })
      .catch(error => console.error('Error fetching products by category:', error));
  }, [selectedCategory, searchQuery]);

  // Handle user login success
  const handleLoginSuccess = (newToken) => {
    localStorage.setItem('token', newToken); // Store the token in localStorage
    setToken(newToken); // Update token state
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setToken(null); // Reset token state
  };

  // Show LoginForm if user is not authenticated (no token)
  if (!token) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  // Main app UI with navbar, routes, and product display
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">My E-Commerce App</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link as={Link} to="/cart">
                {/* Cart icon and link */}
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
              {/* Dropdown for product categories */}
              <DropdownButton variant="secondary" title={selectedCategory || "Select Category"} className="ms-2">
                <Dropdown.Item onClick={() => setSelectedCategory('')}>All Categories</Dropdown.Item>
                {categories.map((category, index) => (
                  <Dropdown.Item key={index} onClick={() => setSelectedCategory(category)}>
                    {category}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Nav>
            {/* Search form */}
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search by name"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form>
            {/* Logout button */}
            {token && (
              <Button variant="outline-light" onClick={handleLogout} className="ms-2">
                <i className="fas fa-sign-out-alt"></i> Logout
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Container for the main content of the application */}
      <Container>
        <Routes>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          {/* Home route displaying all products */}
          <Route path="/" element={
            <Row xs={1} md={2} lg={4} className="g-4">
              {products.map((product) => (
                <Col key={product.id}>
                  {/* Product card with link to product details */}
                  <Card className="h-100 shadow-sm bg-white rounded">
                    <Link to={`/product/${product.id}`} className="text-dark text-decoration-none">
                      <Card.Img variant="top" src={product.thumbnail} alt={product.title} />
                    </Link>
                      <Card.Body>
                        {/* Product title and price */}
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>${product.price}</Card.Text>
                        {/* Button to add product to cart */}
                        <button variant="primary" onClick={() => addToCart(product)}>Add to Cart</button>
                      </Card.Body>
                    
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