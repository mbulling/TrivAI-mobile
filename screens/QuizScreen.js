import React, { useEffect, useState, useRef } from "react";
import { get_topic_mcq } from "../lib/external";
import { View, Text, Pressable } from "react-native";
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

const QuizScreen = (props) => {
  const [questions, setQuestions] = useState([]);
  const [numberCorrect, setNumberCorrect] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      const retries = async (tries = 3) => {
        const { topic, numberQuestions } = props.route.params;
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
    if (selectionIndex === questions[0].answer_id)
      setNumberCorrect((prev) => prev + 1);
    setQuestions((prev) => prev.slice(1));
  };

  if (loading) return <Loading />;
  if (questions.length === 0)
    return <FinishedScreen numberCorrect={numberCorrect} />;
  return (
    <View>
      <Question handler={_selectionHandler} question={questions[0]} />
    </View>
  );
};

const FinishedScreen = ({ numberCorrect }) => {
  return (
    <View>
      <Text>You got {numberCorrect} questions correct!</Text>
    </View>
  );
};

const Question = ({ question, handler }) => {
  return (
    <View>
      <Header lead={question.question} />
      {question.options.map((opt, index) => {
        return (
          <Pressable key={opt} onPress={() => handler(index)}>
            <Option text={opt} />
          </Pressable>
        );
      })}
    </View>
  );
};

const Header = ({ lead }) => {
  return <Text>{lead}</Text>;
};

const Option = ({ text }) => {
  return <Text>{text}</Text>;
};

export default QuizScreen;