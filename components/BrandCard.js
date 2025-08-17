import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { styles } from '../constants/styles';

const BrandCard = ({ brand, onPress }) => {
  const handlePress = () => {
    if (onPress && brand) {
      onPress(brand);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <Image 
          source={{ uri: brand.logo }} 
          style={styles.cardImage}
          resizeMode="cover"
        />
        <Text style={styles.cardTitle}>{brand.name}</Text>
        <Text style={styles.cardSubtitle}>{brand.tagline}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BrandCard;