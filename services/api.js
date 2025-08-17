/**
 * API Service Layer for BrandPeek
 * Handles all API communications with the MockAPI backend
 */

const BASE_URL = 'https://YOUR_MOCKAPI_BASE_URL/api/v1';

/**
 * Fetches all brands from the API
 * @returns {Promise<Array>} Array of brand objects
 * @throws {Error} When API call fails or returns invalid data
 */
export const fetchBrands = async () => {
  try {
    const response = await fetch(`${BASE_URL}/brands`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Validate response structure
    if (!data || !Array.isArray(data.brands)) {
      throw new Error('Invalid response format: expected brands array');
    }
    
    // Validate each brand object has required fields
    const validatedBrands = data.brands.map(brand => {
      if (!brand.id || !brand.name || !brand.logo || !brand.tagline) {
        throw new Error('Invalid brand data: missing required fields');
      }
      
      return {
        id: String(brand.id),
        name: String(brand.name),
        logo: String(brand.logo),
        tagline: String(brand.tagline),
        description: brand.description ? String(brand.description) : ''
      };
    });
    
    return validatedBrands;
    
  } catch (error) {
    // Re-throw with more context for network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
    }
    
    // Re-throw other errors as-is
    throw error;
  }
};

/**
 * Fetches a specific brand by ID from the API
 * @param {string} id - The brand ID to fetch
 * @returns {Promise<Object>} Brand object with detailed information
 * @throws {Error} When API call fails, brand not found, or returns invalid data
 */
export const fetchBrandById = async (id) => {
  // Validate input parameter
  if (!id || typeof id !== 'string') {
    throw new Error('Invalid brand ID: ID must be a non-empty string');
  }
  
  try {
    const response = await fetch(`${BASE_URL}/brands/${encodeURIComponent(id)}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Brand with ID "${id}" not found`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Validate response structure
    if (!data || !data.brand) {
      throw new Error('Invalid response format: expected brand object');
    }
    
    const brand = data.brand;
    
    // Validate brand object has required fields
    if (!brand.id || !brand.name || !brand.logo || !brand.tagline) {
      throw new Error('Invalid brand data: missing required fields');
    }
    
    // Return formatted brand object
    return {
      id: String(brand.id),
      name: String(brand.name),
      logo: String(brand.logo),
      tagline: String(brand.tagline),
      description: brand.description ? String(brand.description) : ''
    };
    
  } catch (error) {
    // Re-throw with more context for network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
    }
    
    // Re-throw other errors as-is
    throw error;
  }
};