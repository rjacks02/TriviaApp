import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d5d5d5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  questionText: {
    fontSize: 20,
    marginBottom: 30, 
    color: '#555',
  },
  answerInput: {
    height: 30,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 12, 
    marginBottom: 30, 
    fontSize: 16,
  },
  clueText: {
    fontSize: 16,
    marginBottom: 20,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
  },
});