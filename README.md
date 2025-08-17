# BrandPeek

BrandPeek is a full-stack assignment project showcasing **React Native (Expo) frontend** and a **Node.js + Express + MySQL backend**.  
It demonstrates modern UI design, smooth navigation, and secure authentication with JWT.

---

## Live Demo

- **Frontend (Expo Go):** Run locally using `npx expo start`

> Note: The Expo Go link will only work while the project is running locally. Please follow setup instructions below to run it.

---

## Features

### Frontend
- **Modern UI Design**: Gradient backgrounds with clean, card-based brand listing  
- **Brand Discovery**: Browse top brands dynamically  
- **Detailed Brand Views**: Tap to view extended brand info  
- **Smooth Navigation**: Powered by React Navigation  

### Backend
- **User Authentication** with JWT  
- **Device Tracking** (restricts one active session per user)  
- **RESTful API** with CRUD operations  
- **MySQL Integration** using `mysql2`  

---

## Project Structure



The BrandPeek app follows a modular architecture with clear separation of concerns:

```
BrandPeek/
│
├── backend/ # Node.js + Express backend
│ ├── routes/ # API route handlers
│ ├── controllers/ # Business logic for endpoints
│ ├── models/ # Database models (if used)
│ ├── middleware/ # Auth & logging middleware
│ ├── views/ # Response formatting
│ ├── app.js # Backend entry point
│ └── package.json # Backend dependencies
│
├── frontend/ # React Native (Expo) frontend
│ ├── components/ # Reusable UI components
│ │ └── BrandCard.js
│ ├── screens/ # App screens
│ │ ├── HomeScreen.js
│ │ └── BrandDetailScreen.js
│ ├── navigation/ # App navigation setup
│ │ └── AppNavigator.js
│ ├── services/ # API interaction layer
│ │ └── api.js
│ ├── constants/ # Styles & config
│ │ └── styles.js
│ ├── assets/ # Static assets (images, fonts, etc.)
│ ├── utils/ # Helper functions
│ ├── App.js # Frontend entry point
│ └── package.json # Frontend dependencies
│
└── README.md                    # Expo configuration (auto-generated)
```
---

## Backend

### Tech Stack
- Node.js
- Express
- MySQL (`mysql2`)
- JWT for authentication

### API Endpoints

#### Authentication
- `POST /login` → User login with device info (JWT issued)  
- `POST /register` → Create new user  
- `POST /logout` → Logout and invalidate JWT  

#### Users
- `GET /users` → Fetch all users  
- `GET /users/:id` → Fetch single user  
- `PUT /users/:id` → Update user  
- `DELETE /users/:id` → Delete user  

#### Devices
- `POST /device` → Save / update device info  

---

## Frontend

### Tech Stack
- React Native (Expo)
- React Navigation
- React Native SVG (gradients)
- React Native Gesture Handler & Screens

### API Endpoints Used (MockAPI Demo)
- `GET /brands` → Fetches all brands for home screen  
- `GET /brands/:id` → Fetches brand details  

---

## Setup Instructions

### Prerequisites
- Node.js (v14+)  
- npm or yarn  
- Expo CLI (`npm install -g @expo/cli`)  
- Expo Go app on mobile  

---


   
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
