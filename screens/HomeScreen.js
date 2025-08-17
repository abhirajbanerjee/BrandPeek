import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Dimensions, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { styles, colors } from '../constants/styles';
import { fetchBrands } from '../services/api';
import BrandCard from '../components/BrandCard';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setLoading(true);
      setError(null);
      const brandsData = await fetchBrands();
      setBrands(brandsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBrandPress = (brand) => {
    navigation.navigate('BrandDetail', { brandId: brand.id });
  };

  const renderBrandCard = ({ item }) => (
    <BrandCard brand={item} onPress={handleBrandPress} />
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading brands...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error}
          </Text>
          <TouchableOpacity style={styles.button} onPress={loadBrands}>
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (brands.length === 0) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            No brands available at the moment.
          </Text>
          <TouchableOpacity style={styles.button} onPress={loadBrands}>
            <Text style={styles.buttonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <FlatList
        data={brands}
        renderItem={renderBrandCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Svg
        height={height}
        width={width}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <Defs>
          <RadialGradient
            id="radialGradient"
            cx="50%"
            cy="50%"
            r="70%"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor={colors.gradientCenter} stopOpacity="1" />
            <Stop offset="50%" stopColor={colors.gradientMid} stopOpacity="1" />
            <Stop offset="100%" stopColor={colors.gradientEdge} stopOpacity="1" />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#radialGradient)" />
      </Svg>

      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Top Brands Today</Text>
            <Text style={styles.subtitle}>
              Discover the most popular brands and their stories
            </Text>
          </View>

          <View style={styles.listContainer}>
            {renderContent()}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;