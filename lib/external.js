import axios from "axios";

const host = process.env.AWS_HOST || "";

async function get_topic_mcq(topic, num_questions) {
  try {
    const response = await axios.post(`${host}/beta_topics_mc`, {
      topic: topic,
      num_questions: num_questions,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default get_topic_mcq;
