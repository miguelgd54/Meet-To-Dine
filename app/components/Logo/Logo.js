import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';

const Logo = () => (
    <View style={styles.container}>
        <Image resizeMode="contain" style={styles.imageContainer} source={require('./images/background.png')} />
        <Text style={styles.text} >Meet to Dine</Text>
    </View>
);

export default Logo;