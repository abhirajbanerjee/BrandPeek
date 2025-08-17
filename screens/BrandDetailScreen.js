import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Dimensions, ActivityIndicator, TouchableOpacity, Image, Alert } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { styles, colors } from '../constants/styles';
import { fetchBrandById } from '../services/api';

const { width, height } = Dimensions.get('window');

const BrandDetailScreen = ({ route, navigation }) => {
  const { brandId } = route.params;
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBrandDetails();
  }, [brandId]);

  const loadBrandDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const brandData = await fetchBrandById(brandId);
      setBrand(brandData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleFollowPress = () => {
    Alert.alert('Follow', 'Follow functionality coming soon!');
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading brand details...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error}
          </Text>
          <TouchableOpacity style={styles.button} onPress={loadBrandDetails}>
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!brand) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Brand not found.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.detailContent}>
        <Image
          source={{ uri: brand.logo }}
          style={styles.detailImage}
          resizeMode="cover"
        />

        <Text style={styles.detailTitle}>{brand.name}</Text>

        <Text style={styles.detailTagline}>"{brand.tagline}"</Text>

        {brand.description && (
          <Text style={styles.detailDescription}>{brand.description}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleFollowPress}>
          <Text style={styles.buttonText}>Follow</Text>
        </TouchableOpacity>
      </View>
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
          <LinearGradient
            id="linearGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor={colors.gradientMid} stopOpacity="1" />
            <Stop offset="50%" stopColor={colors.gradientCenter} stopOpacity="0.8" />
            <Stop offset="100%" stopColor={colors.gradientEdge} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#linearGradient)" />
      </Svg>

      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color={colors.primary} />
      </TouchableOpacity>

      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.detailContainer}>
          {renderContent()}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default BrandDetailScreen;