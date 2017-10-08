import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


const imageWidth = Dimensions.get('window').width / 2;
export default EStyleSheet.create({
    container: {
        alignItems: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: imageWidth,
        height: imageWidth,
    },
    text: {
        fontWeight: '600',
        fontSize: 20,
        marginTop: 15,
        letterSpacing: -0.5,
        color: '$white',

    },

});