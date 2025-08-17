/**
 * API Service Tests
 * Tests the API service functions for proper data fetching and error handling
 */

import { fetchBrands, fetchBrandById } from '../../services/api';

// Mock fetch globally
global.fetch = jest.fn();

describe('API Service', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('fetchBrands', () => {
    it('fetches brands successfully', async () => {
      const mockResponse = {
        brands: [
          {
            id: '1',
            name: 'Test Brand 1',
            logo: 'https://example.com/logo1.png',
            tagline: 'Test tagline 1',
            description: 'Test description 1'
          },
          {
            id: '2',
            name: 'Test Brand 2',
            logo: 'https://example.com/logo2.png',
            tagline: 'Test tagline 2',
            description: 'Test description 2'
          }
        ]
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchBrands();
      
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: '1',
        name: 'Test Brand 1',
        logo: 'https://example.com/logo1.png',
        tagline: 'Test tagline 1',
        description: 'Test description 1'
      });
    });

    it('handles network errors', async () => {
      fetch.mockRejectedValueOnce(new TypeError('Network error'));

      await expect(fetchBrands()).rejects.toThrow(
        'Network error: Unable to connect to the server'
      );
    });

    it('handles HTTP errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(fetchBrands()).rejects.toThrow('HTTP error! status: 500');
    });

    it('validates response format', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ invalid: 'response' }),
      });

      await expect(fetchBrands()).rejects.toThrow(
        'Invalid response format: expected brands array'
      );
    });
  });

  describe('fetchBrandById', () => {
    it('fetches brand by ID successfully', async () => {
      const mockResponse = {
        brand: {
          id: '1',
          name: 'Test Brand',
          logo: 'https://example.com/logo.png',
          tagline: 'Test tagline',
          description: 'Test description'
        }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchBrandById('1');
      
      expect(result).toEqual({
        id: '1',
        name: 'Test Brand',
        logo: 'https://example.com/logo.png',
        tagline: 'Test tagline',
        description: 'Test description'
      });
    });

    it('handles invalid ID parameter', async () => {
      await expect(fetchBrandById('')).rejects.toThrow(
        'Invalid brand ID: ID must be a non-empty string'
      );
      
      await expect(fetchBrandById(null)).rejects.toThrow(
        'Invalid brand ID: ID must be a non-empty string'
      );
    });

    it('handles 404 errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(fetchBrandById('999')).rejects.toThrow(
        'Brand with ID "999" not found'
      );
    });
  });
});