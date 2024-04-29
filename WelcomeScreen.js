import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { styles } from './styles';

const WelcomeScreen = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('./assets/welcomebackground.png')}
            style={styles.welbackground}
        >
            <View style={styles.welcontainer}>
                <Text style={styles.weltitle}>Welcome to Quizzle!</Text>
                <Button
                title="Start Your Trivia"
                onPress={() => navigation.navigate('Trivia')}
                style={styles.startButton}
>       <Text style={styles.startButtonText}>Start Your Trivia</Text>
        </Button>
        </View>
        </ImageBackground>
    );
};


export default WelcomeScreen;
