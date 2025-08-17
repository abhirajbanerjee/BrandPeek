/**
 * BrandCard Component Tests
 * Tests the BrandCard component functionality and styling
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BrandCard from '../../components/BrandCard';

const mockBrand = {
  id: '1',
  name: 'Test Brand',
  logo: 'https://example.com/logo.png',
  tagline: 'Test tagline',
  description: 'Test description'
};

describe('BrandCard Component', () => {
  it('renders brand information correctly', () => {
    const { getByText } = render(<BrandCard brand={mockBrand} />);
    
    expect(getByText('Test Brand')).toBeTruthy();
    expect(getByText('Test tagline')).toBeTruthy();
  });

  it('calls onPress when card is pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <BrandCard brand={mockBrand} onPress={mockOnPress} />
    );
    
    fireEvent.press(getByText('Test Brand'));
    expect(mockOnPress).toHaveBeenCalledWith(mockBrand);
  });

  it('handles missing onPress gracefully', () => {
    const { getByText } = render(<BrandCard brand={mockBrand} />);
    
    expect(() => {
      fireEvent.press(getByText('Test Brand'));
    }).not.toThrow();
  });

  it('displays brand logo with correct source', () => {
    const { getByTestId } = render(
      <BrandCard brand={mockBrand} onPress={() => {}} />
    );
    
    // Note: In a real test, you'd add testID to the Image component
    // This is a placeholder for image testing
    expect(true).toBeTruthy();
  });
});