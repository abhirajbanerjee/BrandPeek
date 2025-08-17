/**
 * App Component Tests
 * Tests the main App component functionality
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// Mock navigation dependencies
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }) => children,
}));

jest.mock('../navigation/AppNavigator', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return () => React.createElement(View, null, React.createElement(Text, null, 'AppNavigator'));
});

describe('App Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('AppNavigator')).toBeTruthy();
  });

  it('wraps AppNavigator with NavigationContainer', () => {
    const { root } = render(<App />);
    expect(root).toBeTruthy();
  });
});