import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import FontStyle from "../styles/FontStyle";

const TriviaInput = ({ onKeyPress }) => {
    let firstRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    let secondRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    let thirdRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']; // Also handles Enter and Backspace
    let keyIndex = 0;

    let largeTextStyle = [FontStyle.robotoMonoBold, FontStyle.largeText, FontStyle.darkish];
    let smallTextStyle = [FontStyle.robotoMonoBold, FontStyle.smallText, FontStyle.darkish, RowStyle.quirkyButtonAdjustments]
    return (
        <View>
            <View style={RowStyle.rowWrap}>
                {
                    firstRow.map(character =>
                    {
                        return (
                            <TouchableOpacity
                                key={keyIndex++}
                                style={RowStyle.triviaButton}
                                onPress={() => onKeyPress(character)}>
                                <Text style={largeTextStyle}>{character}</Text>
                            </TouchableOpacity>)
                    })
                }
            </View>
            <View style={RowStyle.rowWrap}>
                {
                    secondRow.map(character =>
                    {
                        return (
                            <TouchableOpacity
                                key={keyIndex++}
                                style={RowStyle.triviaButton}
                                onPress={() => onKeyPress(character)}>
                                <Text style={largeTextStyle}>{character}</Text>
                            </TouchableOpacity>)
                    })
                }
            </View>
            <View style={RowStyle.rowWrap}>
                <TouchableOpacity style={RowStyle.triviaButton} onPress={() => onKeyPress("ENTER")}>
                    <Text style={smallTextStyle}>ENTER</Text>
                </TouchableOpacity>
                {
                    thirdRow.map(character =>
                    {
                        return (
                            <TouchableOpacity
                                key={keyIndex++}
                                style={RowStyle.triviaButton}
                                onPress={() => onKeyPress(character)}>
                                <Text style={largeTextStyle}>{character}</Text>
                            </TouchableOpacity>)
                    })
                }
                <TouchableOpacity style={RowStyle.triviaButton} onPress={() => onKeyPress("DELETE")}>
                    <Text style={smallTextStyle}>DELETE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TriviaInput;

const RowStyle = StyleSheet.create({
    triviaButton: {
        padding: 10,
        backgroundColor: '#ced0d6',
        borderRadius: 5,
        marginHorizontal: 2,
        marginVertical: -8,
    },
    rowWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    quirkyButtonAdjustments: {
        marginTop: 8,
    }
});