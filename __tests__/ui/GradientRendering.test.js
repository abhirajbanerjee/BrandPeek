/**
 * Gradient Rendering and UI Tests
 * Tests gradient backgrounds and styling across components
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../../screens/HomeScreen';
import BrandDetailScreen from '../../screens/BrandDetailScreen';
import { colors, styles } from '../../constants/styles';

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

// Mock route params for BrandDetailScreen
const mockRoute = {
  params: { brandId: '1' }
};

// Mock fetch
global.fetch = jest.fn();

// Mock react-native-svg components
jest.mock('react-native-svg', () => ({
  Svg: ({ children, ...props }) => {
    const React = require('react');
    const { View } = require('react-native');
    return React.createElement(View, { testID: 'svg-container', ...props }, children);
  },
  Defs: ({ children }) => {
    const React = require('react');
    const { View } = require('react-native');
    return React.createElement(View, { testID: 'svg-defs' }, children);
  },
  RadialGradient: (props) => {
    const React = require('react');
    const { View } = require('react-native');
    return React.createElement(View, { testID: 'radial-gradient', ...props });
  },
  LinearGradient: (props) => {
    const React = require('react');
    const { View } = require('react-native');
    return React.createElement(View, { testID: 'linear-gradient', ...props });
  },
  Stop: (props) => {
    const React = require('react');
    const { View } = require('react-native');
    return React.createElement(View, { testID: 'gradient-stop', ...props });
  },
  Rect: (props) => {
    const React = require('react');
    const { View } = require('react-native');
    return React.createElement(View, { testID: 'gradient-rect', ...props });
  },
}));

// Mock Ionicons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: (props) => {
    const React = require('react');
    const { View } = require('react-native');
    return React.createElement(View, { testID: 'ionicon', ...props });
  },
}));

describe('Gradient Rendering and UI Tests', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('HomeScreen Gradient', () => {
    it('renders radial gradient background', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ brands: [] }),
      });

      const { getByTestId } = render(
        <HomeScreen navigation={mockNavigation} />
      );

      // Verify SVG container is rendered
      expect(getByTestId('svg-container')).toBeTruthy();
      
      // Verify radial gradient is rendered
      expect(getByTestId('radial-gradient')).toBeTruthy();
      
      // Verify gradient rect is rendered
      expect(getByTestId('gradient-rect')).toBeTruthy();
    });

    it('uses correct gradient colors', () => {
      // Verify color constants are defined correctly
      expect(colors.gradientCenter).toBe('#0B6CFF');
      expect(colors.gradientMid).toBe('#083D9A');
      expect(colors.gradientEdge).toBe('#01010A');
    });
  });

  describe('BrandDetailScreen Gradient', () => {
    it('renders linear gradient background', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          brand: {
            id: '1',
            name: 'Test Brand',
            logo: 'https://example.com/logo.png',
            tagline: 'Test tagline',
            description: 'Test description'
          }
        }),
      });

      const { getByTestId } = render(
        <BrandDetailScreen navigation={mockNavigation} route={mockRoute} />
      );

      // Verify SVG container is rendered
      expect(getByTestId('svg-container')).toBeTruthy();
      
      // Verify linear gradient is rendered
      expect(getByTestId('linear-gradient')).toBeTruthy();
      
      // Verify gradient rect is rendered
      expect(getByTestId('gradient-rect')).toBeTruthy();
    });

    it('renders back button with correct styling', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          brand: {
            id: '1',
            name: 'Test Brand',
            logo: 'https://example.com/logo.png',
            tagline: 'Test tagline',
            description: 'Test description'
          }
        }),
      });

      const { getByTestId } = render(
        <BrandDetailScreen navigation={mockNavigation} route={mockRoute} />
      );

      // Verify back button icon is rendered
      expect(getByTestId('ionicon')).toBeTruthy();
    });
  });

  describe('Styling Constants', () => {
    it('has correct color definitions', () => {
      expect(colors.primary).toBe('#FFFFFF');
      expect(colors.secondary).toBe('#E0E0E0');
      expect(colors.accent).toBe('#0B6CFF');
      expect(colors.cardBackground).toBe('rgba(255, 255, 255, 0.1)');
    });

    it('has consistent spacing values', () => {
      expect(styles.container.flex).toBe(1);
      expect(styles.headerTitle.fontSize).toBe(32);
      expect(styles.headerTitle.fontWeight).toBe('bold');
    });

    it('has proper card styling', () => {
      expect(styles.card.borderRadius).toBe(12);
      expect(styles.card.backgroundColor).toBe(colors.cardBackground);
      expect(styles.card.borderColor).toBe(colors.cardBorder);
    });

    it('has proper button styling', () => {
      expect(styles.button.backgroundColor).toBe(colors.accent);
      expect(styles.button.borderRadius).toBe(8);
      expect(styles.buttonText.color).toBe(colors.primary);
    });
  });

  describe('Responsive Design', () => {
    it('uses flexible layouts', () => {
      expect(styles.container.flex).toBe(1);
      expect(styles.safeContainer.flex).toBe(1);
      expect(styles.contentContainer.flex).toBe(1);
    });

    it('has proper spacing for different screen elements', () => {
      expect(styles.contentContainer.paddingHorizontal).toBe(16); // spacing.md
      expect(styles.headerContainer.marginBottom).toBe(32); // spacing.xl
      expect(styles.card.marginVertical).toBe(8); // spacing.sm
    });
  });
});