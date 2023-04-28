import React, { useEffect, useState, useContext } from "react";
import { get_topic_mcq } from "../lib/external";
import { View, Text, Pressable, StyleSheet, Image, Button } from "react-native";
import myTrophy from "../assets/myTrophy.png";
import Loading from "./Loading";
import * as BE from "../lib/external";
import UserContext from "../contexts/user";

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
  const { user, setUser } = useContext(UserContext);

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

  const _selectionHandler = async (selectionIndex) => {
    if (selectionIndex === questions[0].answer_id) {
      await BE.incrQuestionCorrect();
      setUser((user) => ({
        ...user,
        questionsCorrect: user.questionsCorrect + 1,
      }));
      console.log(user.questionsCorrect);
      setNumberCorrect((prev) => prev + 1);
    }
    setRevealAnswer(true);
  };

  const _nextHandler = () => {
    if (!revealAnswer) {
      console.log("no answer selected yet");
      return;
    }
    setQuestions((prev) => prev.slice(1));
    setRevealAnswer(false);
  };

  if (loading) return <Loading />;
  if (questions.length === 0)
    return (
      <FinishedScreen numberCorrect={numberCorrect} navigation={navigation} />
    );
  return (
    <View style={styles.quizScreenContainer}>
      <View style={styles.questionContainer}>
        <Question
          optionHandler={_selectionHandler}
          nextHandler={_nextHandler}
          question={questions[0]}
          revealAnswer={revealAnswer}
        />
      </View>

      <View style={styles.nextButtonContainer}>
        <NextButton
          nextHandler={_nextHandler}
          revealAnswer={revealAnswer}
        />
      </View>
    </View>
  );
};

const FinishedScreen = ({ numberCorrect, navigation }) => {
  const _navigationHandler = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.endScreenContainer}>
      <Image source={myTrophy} style={styles.trophy} />
      <Text>You got {numberCorrect} questions correct!</Text>
      <Pressable onPress={() => _navigationHandler("EnterTopic")}>
        <Text>Create Another Quiz</Text>
      </Pressable>
      <Pressable onPress={() => _navigationHandler("Home")}>
        <Text>Go Home</Text>
      </Pressable>
    </View>
  );
};

const Question = ({ question, optionHandler, nextHandler, revealAnswer }) => {
  return (
    <View>
      <Header lead={question.question} />
      {question.options.map((opt, index) => {
        return (
          <Pressable
            key={opt}
            onPress={() => optionHandler(index)}
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

const NextButton = ({ nextHandler, revealAnswer }) => {
  if (revealAnswer) {
    return (
      <View style={styles.nextButton}>
        <Button title="Next" color="white" onPress={nextHandler} />
      </View>
    )
  } else {
    return <></>
  }
}

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
    flex: 1
  },
  nextButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20
  },
  quizScreenContainer: {
    flex: 1
  },
  endScreenContainer: {
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
    backgroundColor: "lightgreen",
    borderRadius: 20,
    overflow: "hidden",
  },
  trophy: {
    width: 200,
    height: 200,
  },
  incorrectAnswerContainer: {
    padding: 20,
    backgroundColor: "tomato",
    borderRadius: 20,
    overflow: "hidden",
  },
  nextButton: {
    margin: 10,
    padding: 10,
    backgroundColor: "darkblue",
    borderRadius: 20
  }
});

export default QuizScreen;
