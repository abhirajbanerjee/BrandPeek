/**
 * Integration Tests for Complete App Flow
 * Tests navigation flow, API integration, and UI rendering
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../../navigation/AppNavigator';

// Mock fetch for API calls
global.fetch = jest.fn();

// Mock react-native-svg components
jest.mock('react-native-svg', () => ({
  Svg: ({ children }) => children,
  Defs: ({ children }) => children,
  RadialGradient: () => null,
  LinearGradient: () => null,
  Stop: () => null,
  Rect: () => null,
}));

// Mock Ionicons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

const mockBrandsResponse = {
  brands: [
    {
      id: '1',
      name: 'Apple',
      logo: 'https://example.com/apple-logo.png',
      tagline: 'Think Different',
      description: 'Apple Inc. is an American multinational technology company.'
    },
    {
      id: '2',
      name: 'Google',
      logo: 'https://example.com/google-logo.png',
      tagline: 'Don\'t be evil',
      description: 'Google LLC is an American multinational technology company.'
    }
  ]
};

const mockBrandDetailResponse = {
  brand: {
    id: '1',
    name: 'Apple',
    logo: 'https://example.com/apple-logo.png',
    tagline: 'Think Different',
    description: 'Apple Inc. is an American multinational technology company that specializes in consumer electronics, computer software, and online services.'
  }
};

describe('Complete App Flow Integration Tests', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('completes full navigation flow from HomeScreen to BrandDetailScreen', async () => {
    // Mock successful API responses
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockBrandsResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockBrandDetailResponse,
      });

    const { getByText, queryByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    // Verify HomeScreen loads
    expect(getByText('Top Brands Today')).toBeTruthy();
    expect(getByText('Discover the most popular brands and their stories')).toBeTruthy();

    // Wait for brands to load
    await waitFor(() => {
      expect(getByText('Apple')).toBeTruthy();
      expect(getByText('Think Different')).toBeTruthy();
    });

    // Verify Google brand is also displayed
    expect(getByText('Google')).toBeTruthy();
    expect(getByText('Don\'t be evil')).toBeTruthy();

    // Tap on Apple brand card to navigate to detail screen
    fireEvent.press(getByText('Apple'));

    // Wait for navigation and brand detail to load
    await waitFor(() => {
      // HomeScreen content should no longer be visible
      expect(queryByText('Top Brands Today')).toBeFalsy();
      
      // BrandDetailScreen content should be visible
      expect(getByText('Apple')).toBeTruthy();
      expect(getByText('"Think Different"')).toBeTruthy();
      expect(getByText('Apple Inc. is an American multinational technology company that specializes in consumer electronics, computer software, and online services.')).toBeTruthy();
      expect(getByText('Follow')).toBeTruthy();
    });

    // Verify API calls were made correctly
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(1, 'https://YOUR_MOCKAPI_BASE_URL/api/v1/brands');
    expect(fetch).toHaveBeenNthCalledWith(2, 'https://YOUR_MOCKAPI_BASE_URL/api/v1/brands/1');
  });

  it('handles API errors gracefully on HomeScreen', async () => {
    // Mock API error
    fetch.mockRejectedValueOnce(new TypeError('Network error'));

    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    // Wait for error state to appear
    await waitFor(() => {
      expect(getByText('Network error: Unable to connect to the server. Please check your internet connection.')).toBeTruthy();
      expect(getByText('Retry')).toBeTruthy();
    });
  });

  it('handles API errors gracefully on BrandDetailScreen', async () => {
    // Mock successful brands fetch, then error on detail fetch
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockBrandsResponse,
      })
      .mockRejectedValueOnce(new TypeError('Network error'));

    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    // Wait for brands to load and tap on one
    await waitFor(() => {
      expect(getByText('Apple')).toBeTruthy();
    });

    fireEvent.press(getByText('Apple'));

    // Wait for error state on detail screen
    await waitFor(() => {
      expect(getByText('Network error: Unable to connect to the server. Please check your internet connection.')).toBeTruthy();
      expect(getByText('Retry')).toBeTruthy();
    });
  });

  it('displays loading states correctly', async () => {
    // Mock delayed API response
    fetch.mockImplementationOnce(() => 
      new Promise(resolve => 
        setTimeout(() => resolve({
          ok: true,
          json: async () => mockBrandsResponse,
        }), 100)
      )
    );

    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    // Should show loading state initially
    expect(getByText('Loading brands...')).toBeTruthy();

    // Wait for brands to load
    await waitFor(() => {
      expect(getByText('Apple')).toBeTruthy();
    }, { timeout: 2000 });
  });
});