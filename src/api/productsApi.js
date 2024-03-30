import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com/products';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
export const fetchCategories = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products/categories');
      return response.data; // The API returns an array of categories
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };