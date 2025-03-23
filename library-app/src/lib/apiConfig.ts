// Environment detection
const isProduction = false;//import.meta.env.PROD;

// Base configurations
export const API_CONFIG = {
    BASE_URL: isProduction 
      ? 'https://your-production-api.com/api/v1'
      : 'http://localhost:8080/api/v1',
    TIMEOUT: 10000, // 10 seconds
    HEADERS: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  
  // Endpoint definitions
  export const ENDPOINTS = {
    BOOKS: `${API_CONFIG.BASE_URL}/books`,
    REVIEWS: `${API_CONFIG.BASE_URL}/reviews`,
    // Add other endpoints as needed
  };