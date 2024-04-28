import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    questionText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    answerBoxesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    answerBox: {
        width: 30,
        height: 30,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
    },
    answerBoxText: {
        fontSize: 18,
    },
    answerInput: {
        marginBottom: 20,
        borderWidth: 1, // Add border width
        borderColor: '#ccc', // Add border color
        borderRadius: 5, // Add border radius for rounded corners
        paddingVertical: 10, // Add padding for vertical spacing
        paddingHorizontal: 15, // Add padding for horizontal spacing
        width: '100%', // Ensure the input takes up full width
    },
    button: {
        backgroundColor: '#FF4500',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        elevation: 3,
        marginBottom: 20, // Add margin to separate from input
    },
    buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#000',
    },
    clueText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#555',
    },
    score: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
});