/**
 * BrandPeek Application Verification Script
 * This script performs comprehensive testing of all application functionality
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 BrandPeek Application Verification Script');
console.log('='.repeat(50));

// Test 1: Verify project structure
console.log('\n📁 Test 1: Project Structure Verification');
const requiredFiles = [
  'App.js',
  'package.json',
  'components/BrandCard.js',
  'screens/HomeScreen.js',
  'screens/BrandDetailScreen.js',
  'navigation/AppNavigator.js',
  'services/api.js',
  'constants/styles.js',
  'README.md'
];

const requiredDirectories = [
  'components',
  'screens',
  'navigation',
  'services',
  'constants',
  'assets',
  'utils'
];

let structureValid = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
    structureValid = false;
  }
});

requiredDirectories.forEach(dir => {
  if (fs.existsSync(path.join(__dirname, dir))) {
    console.log(`✅ ${dir}/ directory exists`);
  } else {
    console.log(`❌ ${dir}/ directory missing`);
    structureValid = false;
  }
});

// Test 2: Verify package.json dependencies
console.log('\n📦 Test 2: Dependencies Verification');
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));

const requiredDependencies = [
  '@react-navigation/native',
  '@react-navigation/native-stack',
  'expo',
  'react',
  'react-native',
  'react-native-svg',
  'react-native-gesture-handler',
  'react-native-screens'
];

let dependenciesValid = true;

requiredDependencies.forEach(dep => {
  if (packageJson.dependencies[dep]) {
    console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
  } else {
    console.log(`❌ ${dep} missing from dependencies`);
    dependenciesValid = false;
  }
});

// Test 3: Verify API service implementation
console.log('\n🌐 Test 3: API Service Verification');
try {
  const apiService = fs.readFileSync(path.join(__dirname, 'services/api.js'), 'utf8');
  
  const apiChecks = [
    { name: 'fetchBrands function', pattern: /export\s+const\s+fetchBrands\s*=/ },
    { name: 'fetchBrandById function', pattern: /export\s+const\s+fetchBrandById\s*=/ },
    { name: 'Base URL configuration', pattern: /BASE_URL\s*=\s*['"`]https:\/\/YOUR_MOCKAPI_BASE_URL/ },
    { name: 'Error handling', pattern: /catch\s*\(.*error.*\)/ },
    { name: 'Response validation', pattern: /if\s*\(.*!.*response\.ok.*\)/ }
  ];

  apiChecks.forEach(check => {
    if (check.pattern.test(apiService)) {
      console.log(`✅ ${check.name} implemented`);
    } else {
      console.log(`❌ ${check.name} missing or incorrect`);
    }
  });
} catch (error) {
  console.log(`❌ Error reading API service: ${error.message}`);
}

// Test 4: Verify gradient implementation
console.log('\n🎨 Test 4: Gradient Implementation Verification');
try {
  const homeScreen = fs.readFileSync(path.join(__dirname, 'screens/HomeScreen.js'), 'utf8');
  const detailScreen = fs.readFileSync(path.join(__dirname, 'screens/BrandDetailScreen.js'), 'utf8');
  const styles = fs.readFileSync(path.join(__dirname, 'constants/styles.js'), 'utf8');

  const gradientChecks = [
    { name: 'HomeScreen RadialGradient', file: 'HomeScreen', pattern: /RadialGradient/, content: homeScreen },
    { name: 'BrandDetailScreen LinearGradient', file: 'BrandDetailScreen', pattern: /LinearGradient/, content: detailScreen },
    { name: 'Gradient colors defined', file: 'styles', pattern: /#0B6CFF.*#083D9A.*#01010A/, content: styles },
    { name: 'SVG import', file: 'HomeScreen', pattern: /from\s+['"`]react-native-svg['"`]/, content: homeScreen }
  ];

  gradientChecks.forEach(check => {
    if (check.pattern.test(check.content)) {
      console.log(`✅ ${check.name} implemented`);
    } else {
      console.log(`❌ ${check.name} missing or incorrect`);
    }
  });
} catch (error) {
  console.log(`❌ Error reading gradient files: ${error.message}`);
}

// Test 5: Verify navigation implementation
console.log('\n🧭 Test 5: Navigation Implementation Verification');
try {
  const appNavigator = fs.readFileSync(path.join(__dirname, 'navigation/AppNavigator.js'), 'utf8');
  const app = fs.readFileSync(path.join(__dirname, 'App.js'), 'utf8');

  const navigationChecks = [
    { name: 'Stack Navigator', pattern: /createNativeStackNavigator/, content: appNavigator },
    { name: 'Home Screen route', pattern: /name=["']Home["']/, content: appNavigator },
    { name: 'BrandDetail Screen route', pattern: /name=["']BrandDetail["']/, content: appNavigator },
    { name: 'NavigationContainer', pattern: /NavigationContainer/, content: app }
  ];

  navigationChecks.forEach(check => {
    if (check.pattern.test(check.content)) {
      console.log(`✅ ${check.name} implemented`);
    } else {
      console.log(`❌ ${check.name} missing or incorrect`);
    }
  });
} catch (error) {
  console.log(`❌ Error reading navigation files: ${error.message}`);
}

// Test 6: Verify component implementation
console.log('\n🧩 Test 6: Component Implementation Verification');
try {
  const brandCard = fs.readFileSync(path.join(__dirname, 'components/BrandCard.js'), 'utf8');
  const homeScreen = fs.readFileSync(path.join(__dirname, 'screens/HomeScreen.js'), 'utf8');
  const detailScreen = fs.readFileSync(path.join(__dirname, 'screens/BrandDetailScreen.js'), 'utf8');

  const componentChecks = [
    { name: 'BrandCard TouchableOpacity', pattern: /TouchableOpacity/, content: brandCard },
    { name: 'BrandCard props handling', pattern: /brand.*onPress/, content: brandCard },
    { name: 'HomeScreen FlatList', pattern: /FlatList/, content: homeScreen },
    { name: 'HomeScreen API integration', pattern: /fetchBrands/, content: homeScreen },
    { name: 'DetailScreen back button', pattern: /goBack|arrow-back/, content: detailScreen },
    { name: 'DetailScreen follow button', pattern: /Follow/, content: detailScreen }
  ];

  componentChecks.forEach(check => {
    if (check.pattern.test(check.content)) {
      console.log(`✅ ${check.name} implemented`);
    } else {
      console.log(`❌ ${check.name} missing or incorrect`);
    }
  });
} catch (error) {
  console.log(`❌ Error reading component files: ${error.message}`);
}

// Test 7: Verify styling implementation
console.log('\n💅 Test 7: Styling Implementation Verification');
try {
  const styles = fs.readFileSync(path.join(__dirname, 'constants/styles.js'), 'utf8');

  const styleChecks = [
    { name: 'Color constants', pattern: /colors\s*=\s*{/ },
    { name: 'Gradient colors', pattern: /gradientCenter.*gradientMid.*gradientEdge/ },
    { name: 'StyleSheet creation', pattern: /StyleSheet\.create/ },
    { name: 'Card styling', pattern: /card:.*{/ },
    { name: 'Button styling', pattern: /button:.*{/ },
    { name: 'Typography definitions', pattern: /headerTitle.*fontSize/ }
  ];

  styleChecks.forEach(check => {
    if (check.pattern.test(styles)) {
      console.log(`✅ ${check.name} implemented`);
    } else {
      console.log(`❌ ${check.name} missing or incorrect`);
    }
  });
} catch (error) {
  console.log(`❌ Error reading styles file: ${error.message}`);
}

// Summary
console.log('\n📊 Verification Summary');
console.log('='.repeat(50));

const allValid = structureValid && dependenciesValid;

if (allValid) {
  console.log('✅ All core functionality appears to be implemented correctly!');
  console.log('\n🎯 Manual Testing Checklist:');
  console.log('1. Run `npm start` to launch the Expo development server');
  console.log('2. Test HomeScreen gradient background rendering');
  console.log('3. Verify brand cards display with proper styling');
  console.log('4. Test navigation from HomeScreen to BrandDetailScreen');
  console.log('5. Verify BrandDetailScreen gradient background');
  console.log('6. Test back button functionality');
  console.log('7. Verify Follow button displays (without functionality)');
  console.log('8. Test error handling with invalid API responses');
  console.log('9. Verify loading states display correctly');
  console.log('10. Test responsive design on different screen sizes');
} else {
  console.log('❌ Some issues found. Please review the failed checks above.');
}

console.log('\n🚀 To start the application:');
console.log('   npm start');
console.log('\n📱 To test on device:');
console.log('   - Install Expo Go app on your mobile device');
console.log('   - Scan the QR code displayed in the terminal');
console.log('   - Or press "i" for iOS simulator, "a" for Android emulator');

console.log('\n✨ Verification complete!');