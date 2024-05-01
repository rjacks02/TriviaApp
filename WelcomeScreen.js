import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import { styles } from './styles';
import FontStyle from "./styles/FontStyle";

const WelcomeScreen = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('./assets/welcomebackground.png')}
            style={styles.welbackground}>
            <View style={styles.welcontainer}>
                <Text style={[FontStyle.robotoMonoBold,
                    FontStyle.titleLargeText,
                    FontStyle.whiteish,
                    WelcomeStyle.bottomMargin40,
                    FontStyle.centerText]}>Quizzle</Text>
                <Text style={[FontStyle.robotoMonoRegular,
                    FontStyle.largerText,
                    FontStyle.whiteish,
                    WelcomeStyle.horizontalMargin20,
                    WelcomeStyle.centerText,
                    WelcomeStyle.bottomMargin40,
                    WelcomeStyle.rowWrap]}>
                    Get six chances to guess or recall a trivia fact.
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Trivia')}
                                  style={WelcomeStyle.welcomeBottom}>
                    <Text style={[FontStyle.robotoMonoRegular,
                        FontStyle.mediumText,
                        FontStyle.whiteish,
                        WelcomeStyle.centerText]}>
                        Play
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default WelcomeScreen;

const WelcomeStyle = StyleSheet.create({
    welcomeBottom: {
        paddingHorizontal: 42,
        paddingVertical: 12,
        backgroundColor: '#111214',
        borderRadius: 24,
    },
    rowWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: "center",
        justifyContent: "center",
    },
    centerText: {
        textAlign: "center",
    },
    horizontalMargin20: {
        marginHorizontal: 24,
    },
    bottomMargin40: {
        marginBottom: 40,
    },
    quirkyButtonAdjustments: {
        marginTop: 8,
    }
});
