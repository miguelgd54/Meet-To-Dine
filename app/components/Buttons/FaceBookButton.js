import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';

import styles from './styles';

const FaceBookButton = ({ text, onPress }) => (
   <TouchableOpacity onPress={onPress}>
       <View>
            <Image style={styles.imageContainer}source={require('./images/facebook.png')} /> 
            <Text>{text}</Text>
       </View>
   </TouchableOpacity> 
);

FaceBookButton.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
};

export default FaceBookButton;