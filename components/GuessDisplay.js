import {View, StyleSheet, Text} from 'react-native';
import FontStyle from "../styles/FontStyle";

const RowDisplay = ({boxCount, guess, correctAnswer}) => {
    let correctAnswerCharacters = null;
    if (correctAnswer != null)
    {
        correctAnswerCharacters = correctAnswer.toUpperCase().split('');
    }

    let textStyle = [FontStyle.robotoMonoBold, FontStyle.largerText];
    let textStyleWhite = [FontStyle.robotoMonoBold, FontStyle.largerText, Style.answeredText];

    return (
        <View style={Style.rowWrap}>
            {
                Array.from(Array(boxCount), (v, k) =>
                {
                    let displayChar = " ";
                    if (guess != null)
                    {
                        displayChar = guess.charAt(k);
                    }

                    let currentBoxStyle = [Style.answerBox];
                    let currentTextStyle = textStyle;

                    if (correctAnswer != null)
                    {
                        currentTextStyle = textStyleWhite;

                        let findCurrentChar = element => element === displayChar;
                        if (displayChar === correctAnswer.charAt(k).toUpperCase())
                        {
                            correctAnswerCharacters.splice(correctAnswerCharacters.findIndex(findCurrentChar), 1);
                            currentBoxStyle = [Style.answerBox, Style.correct];
                        }
                        else if (correctAnswerCharacters.includes(displayChar))
                        {
                            correctAnswerCharacters.splice(correctAnswerCharacters.findIndex(findCurrentChar), 1);
                            currentBoxStyle = [Style.answerBox, Style.close];
                        }
                        else
                        {
                            currentBoxStyle = [Style.answerBox, Style.incorrect];
                        }
                    }

                    return (
                        <View key={k} style={currentBoxStyle}>
                            <Text style={currentTextStyle}>{displayChar}</Text>
                        </View>)
                })
            }
        </View>
    );
}

const GuessDisplay = ({ boxCount, allGuesses, evaluateIndex, correctAnswer }) => {
    return (
        <View style={Style.marginBottom20}>
        {
            Array.from(Array(allGuesses.length), (v, k) =>
            {
                let guess = null;
                if (allGuesses != null && k < allGuesses.length)
                {
                    guess = allGuesses[k];
                }

                return <RowDisplay key = {k}
                                   boxCount={boxCount}
                                   guess={guess}
                                   correctAnswer={k < evaluateIndex ? correctAnswer : null}/>
            })
        }
        </View>
    );
}

export default GuessDisplay;

const Style = StyleSheet.create({
    answerBox: {
        width: 44,
        height: 44,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2,
    },
    correct: {
        backgroundColor: '#51c434',
    },
    close: {
        backgroundColor: '#efcc4f',
    },
    incorrect: {
        backgroundColor: '#1e1f22',
    },
    answeredText: {
        color: '#ffffff',
    },
    rowWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: "center",
        justifyContent: "center",
        marginBottom: 5,
    },
    marginBottom20: {
        marginBottom: 20,
    }
});