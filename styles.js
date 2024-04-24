import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold', 
    marginBottom: 20,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
  },
  answerInput: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  clueText: {
    fontSize: 16,
    color: 'red',
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  }
});