# BrandPeek

A React Native Expo application that displays a curated list of top brands with detailed brand information. The app features a modern, gradient-based UI design with smooth navigation between a home screen showing brand cards and detailed brand views.

## Features

- **Modern UI Design**: Beautiful radial and linear gradient backgrounds
- **Brand Discovery**: Browse top brands in an attractive card-based interface
- **Detailed Brand Views**: Tap any brand to see comprehensive information
- **Smooth Navigation**: Seamless transitions between screens
- **API Integration**: Dynamic brand data fetching from MockAPI backend

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Expo CLI (install globally with `npm install -g @expo/cli`)
- Expo Go app on your mobile device (for testing)

### Installation

1. Clone or download the project
2. Navigate to the BrandPeek directory:
   ```bash
   cd BrandPeek
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   expo start
   ```

5. Use the Expo Go app to scan the QR code and run the app on your device, or use an iOS/Android simulator.

## MockAPI Backend Setup

This application is designed to work with a MockAPI backend for brand data. To set up your backend:

1. **Create a MockAPI Account**: Visit [mockapi.io](https://mockapi.io) and create a free account

2. **Create a New Project**: Set up a new project for BrandPeek

3. **Create Brand Resource**: Create a resource called "brands" with the following schema:
   ```json
   {
     "id": "string",
     "name": "string", 
     "logo": "string",
     "tagline": "string",
     "description": "string"
   }
   ```

4. **Update API Configuration**: In `services/api.js`, replace `YOUR_MOCKAPI_BASE_URL` with your actual MockAPI base URL:
   ```javascript
   const BASE_URL = 'https://your-project-id.mockapi.io/api/v1';
   ```

5. **Add Sample Data**: Create some sample brand entries in your MockAPI dashboard with:
   - Brand names (e.g., "Apple", "Nike", "Coca-Cola")
   - Logo URLs (use placeholder images or real brand logos)
   - Catchy taglines
   - Detailed descriptions

### API Endpoints Used

- `GET /brands` - Fetches all brands for the home screen
- `GET /brands/:id` - Fetches detailed information for a specific brand

## Project Structure

The BrandPeek app follows a modular architecture with clear separation of concerns:

```
BrandPeek/
├── App.js                    # Root component with NavigationContainer
├── package.json              # Dependencies and project configuration
├── README.md                 # This documentation file
├── components/               # Reusable UI components
│   └── BrandCard.js         # Brand display card component
├── screens/                  # Screen components
│   ├── HomeScreen.js        # Main brand listing with radial gradient
│   └── BrandDetailScreen.js # Individual brand details with linear gradient
├── navigation/               # Navigation configuration
│   └── AppNavigator.js      # React Navigation stack setup
├── services/                 # API and external services
│   └── api.js               # Brand data fetching functions
├── constants/                # App-wide constants and configurations
│   └── styles.js            # Centralized styling definitions
├── assets/                   # Static assets (images, fonts, etc.)
├── utils/                    # Utility functions and helpers
└── .expo/                    # Expo configuration (auto-generated)
```

### Folder Purposes

- **`components/`**: Reusable UI components that can be used across multiple screens
- **`screens/`**: Individual screen components that represent full app views
- **`navigation/`**: Navigation configuration and routing setup
- **`services/`**: External API integrations and data fetching logic
- **`constants/`**: App-wide constants including styles, colors, and configuration
- **`assets/`**: Static files like images, fonts, and other media
- **`utils/`**: Helper functions and utilities used throughout the app

## Key Dependencies

- **`expo`**: Expo managed workflow for React Native development
- **`react-navigation`**: Navigation library for screen transitions
  - `@react-navigation/native`
  - `@react-navigation/native-stack`
- **`react-native-svg`**: SVG support for gradient backgrounds
- **`react-native-gesture-handler`**: Enhanced gesture handling
- **`react-native-screens`**: Native screen optimization

## Development Notes

### Styling Approach
- Centralized styling in `constants/styles.js` for consistency
- Modern, clean design with proper spacing and typography
- Gradient backgrounds using react-native-svg for better performance

### Navigation Flow
- Stack-based navigation with smooth transitions
- Parameter passing between screens for brand details
- Proper back navigation handling

### API Integration
- Modular API service layer for easy backend switching
- Error handling and loading states
- Proper data formatting and validation

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `expo start -c`
2. **Dependency conflicts**: Delete `node_modules` and run `npm install` again
3. **Expo Go connection issues**: Ensure your device and computer are on the same network
4. **API not working**: Verify your MockAPI URL is correctly configured in `services/api.js`

### Performance Tips

- Use `expo start --tunnel` if you're having network connectivity issues
- For better performance on older devices, consider using Expo development build
- Optimize images and use appropriate sizes for better loading times

## Contributing

When contributing to this project:

1. Follow the established folder structure
2. Use the centralized styling system
3. Add proper error handling for new features
4. Test on both iOS and Android platforms
5. Update this README if you add new setup requirements

## License

This project is for educational and demonstration purposes.