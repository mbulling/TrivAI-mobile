import React, { useEffect, useState, useContext } from "react";
import { get_topic_mcq, create_game, get_quiz_info } from "../lib/external";
import { View, Text, Pressable, StyleSheet, Image, Button, ScrollView } from "react-native";
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
  const { topic, numberQuestions, gameID, user_name, joining } = route.params;
  const [questions, setQuestions] = useState([]);
  const [numberCorrect, setNumberCorrect] = useState(0);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);


  useEffect(() => {
    const get_questions = async (gameID) => {
      try {
        const question_data = await get_quiz_info(parseInt(gameID));
        setQuestions(question_data.questions);
        return question_data.questions;
      }
      catch (err) {
        console.log("Error creating game: ", err);
      }
      setLoading(false);
      return true;
    };
    const fetchQuestions = async () => {
      const makeGame = async (gameID, topic, questions) => {
        try {
          const success = await create_game(parseInt(gameID), topic, questions);
        }
        catch (err) {
          console.log("Error creating game: ", err);
        }
        return true;
      };
      const retries = async (tries = 3) => {
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

      setQuestions(res);

      if (gameID > 0) {
        const question_multiplayer = await get_questions(parseInt(gameID));
        setQuestions(question_multiplayer);

        const success = await makeGame(parseInt(gameID), topic, res)
      };

      if (joining === false) { setLoading(false); }
    };

    fetchQuestions();

    if (joining) {
      const question_multiplayer = get_questions(gameID);
      setQuestions(question_multiplayer);
    }

  }, [loading]);

  const _selectionHandler = async (selectionIndex, selectedOption) => {
    if (revealAnswer) { // Prevent user from answering twice
      return;
    }

    await BE.incrQuestionTotal(); // Increment total questions answered
    setUser((user) => ({
      ...user,
      questionsTotal: user.questionsTotal + 1,
    }));

    if (questions != null && questions[0] != null && selectionIndex === questions[0].answer_id) {
      await BE.incrQuestionCorrect();
      setUser((user) => ({
        ...user,
        questionsCorrect: user.questionsCorrect + 1,
      }));
      console.log(user.questionsCorrect);
      setNumberCorrect((prev) => prev + 1);
    }
    setRevealAnswer(true);
    selectedOption(selectionIndex);
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
  if (questions != null && questions.length === 0)
    return (
      <FinishedScreen numberCorrect={numberCorrect} navigation={navigation} user_name={user_name} gameID={gameID} />
    );
  return (
    <View style={styles.quizScreenContainer}>
      <ScrollView>
        <View style={styles.questionContainer}>
          <Question
            optionHandler={_selectionHandler}
            nextHandler={_nextHandler}
            question={questions != null ? questions[0] : null}
            revealAnswer={revealAnswer}
          />
        </View>
      </ScrollView>
      <View style={styles.nextButtonContainer}>
        <NextButton
          nextHandler={_nextHandler}
          revealAnswer={revealAnswer}
        />
      </View>
    </View>
  );
};

const FinishedScreen = ({ numberCorrect, navigation, user_name, gameID }) => {
  if (gameID > 0) {
    BE.add_player(parseInt(gameID), user_name, numberCorrect);
  };

  const _navigationHandler = (screenName) => {
    navigation.navigate(screenName);
  };

  const MultiplayerFinish = () => {
    navigation.navigate("Finish", { gameID: gameID });
  }

  return (
    <View style={styles.endScreenContainer}>
      <Image source={myTrophy} style={styles.trophy} />
      <Text style={styles.finishMsg}>You got {numberCorrect} questions correct!</Text>
      <View style={styles.finishBtn}>
        {gameID > 0 ? (<Pressable onPress={() => MultiplayerFinish()}>
          <Text style={styles.finishBtnText}>See Leaderboard</Text>
        </Pressable>) : (<Pressable onPress={() => _navigationHandler("Enter Topic")}>
          <Text style={styles.finishBtnText}>Create Another Quiz</Text>
        </Pressable>)}
      </View>

      <Pressable style={styles.finishBtn} onPress={() => _navigationHandler("Home")}>
        <Text style={styles.finishBtnText}>Go Home</Text>
      </Pressable>
    </View>
  );
};

const Question = ({ question, optionHandler, nextHandler, revealAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <View>
      <Header lead={question != null ? question.question : null} />
      <View style={styles.listOptions}>
        {question.options.map((opt, index) => {
          return (
            <Pressable
              key={opt}
              onPress={() => optionHandler(index, setSelectedOption)}
              style={styles.options}
            >
              <Option
                text={opt}
                revealAnswer={revealAnswer}
                isCorrectAnswer={index === question.answer_id}
                isSelected={index === selectedOption}
              />
            </Pressable>
          );
        })}
      </View>
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

const Option = ({ text, revealAnswer, isCorrectAnswer, isSelected }) => {
  let optionStyle;

  if (!revealAnswer) {
    optionStyle = styles.answerContainer;
  } else if (isCorrectAnswer) {
    optionStyle = styles.correctAnswerContainer;
  } else if (isSelected) {
    optionStyle = styles.incorrectAnswerContainer;
  } else {
    optionStyle = styles.answerContainer;
  }

  return (
    <View style={styles.optionContainer}>
      <Text style={optionStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  question: {
    fontSize: 30,
    padding: 20,
    // fontFamily: "Inter-Bold",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#4051A6",
  },
  questionContainer: {
    flex: 1
  },
  nextButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    // fontFamily: "Inter-Regular",
    padding: 20,
    fontSize: 18,
    borderRadius: 20,
  },
  listOptions: {
    marginTop: 10,
  },
  options: {
    paddingTop: 10,
  },
  isSelected: {
    fontWeight: "bold",
  },
  correctAnswerContainer: {
    backgroundColor: "green",
    // fontFamily: "Inter-Bold",
    fontWeight: "bold",
    padding: 20,
    color: "white",
    fontSize: 18,
    borderRadius: 20,
  },
  trophy: {
    width: 250,
    height: 250,
  },
  incorrectAnswerContainer: {
    backgroundColor: "#880808",
    // fontFamily: "Inter-Regular",
    padding: 20,
    color: "#EE4B2B",
    fontSize: 18,
    borderRadius: 20,
  },
  nextButton: {
    margin: 10,
    padding: 10,
    backgroundColor: "darkblue",
    borderRadius: 20,
    position: "absolute",
    bottom: 15,
    width: "90%",
    shadowColor: "#363636",
    shadowOffset: {
      width: -3,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 0,
  },
  finishMsg: {
    color: "#4051A6",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
    paddingBottom: 20,
    width: "80%"
  },
  finishBtn: {
    padding: 20,
    backgroundColor: "#EE5F88",
    borderRadius: 30,
    width: "70%",
    margin: 5,
    alignItems: "center",
    shadowColor: '#363636',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
  },
  finishBtnText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold"
  }
});

export default QuizScreen;
