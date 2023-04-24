import axios from 'axios';

const host = process.env.AWS_HOST || "";

export async function get_topic_mcq(topic, num_questions) {
  try {
    console.log(`${host}/beta_topics_mc`)
    const response = await axios.post(`${host}/beta_topics_mc`, {
      'topic': topic,
      'num_questions': num_questions
    })
    return response.data;
  } catch (error) {

    console.error(error);
  }
}

export async function get_topics() {
  try {
    const response = await axios.get(`${host}/get_explore`)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

