import React, { useEffect, useState, useRef } from "react";
import { get_topic_mcq } from "../lib/external";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Loading from "./Loading";

const fetchSuccess = (res) => res;

const fetchReject = (rej) => {
  console.log("something went wrong while fetching mcq: ", rej);
  return null;
};
const fetchException = (err) => {
  console.log("something went wrong while fetching mcq: ", err);
  return null;
};

const QuizScreen = ({ route, navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [numberCorrect, setNumberCorrect] = useState(0);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const retries = async (tries = 3) => {
        const { topic, numberQuestions } = route.params;
        if (topic === undefined || numberQuestions === undefined) return null;
        if (tries <= 0) {
          console.log("max retries reached, could not fetch mcq");
          return null;
        }
        const attempt = await get_topic_mcq(
          topic,
          Math.max(Math.min(numberQuestions, 10), 1)
        )
          .then(fetchSuccess, fetchReject)
          .catch(fetchException);

        if (attempt === null) return await retries(tries - 1);
        return attempt;
      };
      const res = await retries();
      if (res === null) return;
      setLoading(false);
      setQuestions(res);
    };
    fetchQuestions();
  }, []);

  const _selectionHandler = (selectionIndex) => {
    if (selectionIndex === questions[0].answer_id) {
      setNumberCorrect((prev) => prev + 1);
    }
    setRevealAnswer(true);
    setTimeout(() => {
      setQuestions((prev) => prev.slice(1));
      setRevealAnswer(false);
    }, 1000);
  };

  if (loading) return <Loading />;
  if (questions.length === 0)
    return (
      <FinishedScreen numberCorrect={numberCorrect} navigation={navigation} />
    );
  return (
    <View>
      <Question
        handler={_selectionHandler}
        question={questions[0]}
        revealAnswer={revealAnswer}
      />
    </View>
  );
};

const FinishedScreen = ({ numberCorrect, navigation }) => {
  const _navigationHandler = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.questionContainer}>
      <Text>You got {numberCorrect} questions correct!</Text>
      <Pressable onPress={() => _navigationHandler("CreateQuiz")}>
        <Text>Create Another Quiz</Text>
      </Pressable>
      <Pressable onPress={() => _navigationHandler("Home")}>
        <Text>Go Home</Text>
      </Pressable>
    </View>
  );
};

const Question = ({ question, handler, revealAnswer }) => {
  return (
    <View>
      <Header lead={question.question} />
      {question.options.map((opt, index) => {
        return (
          <Pressable
            key={opt}
            onPress={() => handler(index)}
            style={styles.options}
          >
            <Option
              text={opt}
              revealAnswer={revealAnswer}
              isCorrectAnswer={index === question.answer_id}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

const Header = ({ lead }) => {
  return <Text style={styles.question}>{lead}</Text>;
};

const Option = ({ text, revealAnswer, isCorrectAnswer }) => {
  return (
    <Text
      style={
        (!revealAnswer && styles.answerContainer) ||
        (isCorrectAnswer && styles.correctAnswerContainer) ||
        styles.incorrectAnswerContainer
      }
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  question: {
    fontSize: 30,
    padding: 20,
  },
  questionContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  answerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  options: {
    padding: 10,
  },
  correctAnswerContainer: {
    padding: 20,
    backgroundColor: "green",
    borderRadius: 20,
    overflow: "hidden",
  },
  incorrectAnswerContainer: {
    padding: 20,
    backgroundColor: "red",
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default QuizScreen;
