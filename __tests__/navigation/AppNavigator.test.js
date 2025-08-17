/**
 * AppNavigator Tests
 * Tests the navigation configuration and screen setup
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../../navigation/AppNavigator';

// Mock the screens
jest.mock('../../screens/HomeScreen', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return () => React.createElement(View, null, React.createElement(Text, null, 'HomeScreen'));
});

jest.mock('../../screens/BrandDetailScreen', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return () => React.createElement(View, null, React.createElement(Text, null, 'BrandDetailScreen'));
});

describe('AppNavigator', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );
    
    // Should render HomeScreen by default (initialRouteName="Home")
    expect(getByText('HomeScreen')).toBeTruthy();
  });

  it('has correct initial route', () => {
    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );
    
    // HomeScreen should be the initial screen
    expect(getByText('HomeScreen')).toBeTruthy();
  });
});