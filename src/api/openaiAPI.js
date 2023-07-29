import axios from "axios";
import { async } from "regenerator-runtime";

// const apiBody = {
//   model: "gpt-3.5-turbo",
//   prompt: `${result}?`
// }

// const apiCall =  async () {
//   await fetch(ApiLink, {
//     method: "POST",
//     headers: {
//       "Content-type" : "application/json"
//     }
//   })
// }

const ApiLink = "https://free.churchless.tech/v1/chat/completions";
const lastRecordedData = result[result.length - 1];

const apiBody = {
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: lastRecordedData }],
};

export const apiCall = async () => {
  try {
    const response = await axios.post(ApiLink, {
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(apiBody),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("An error occurred during API call:", error);
  }
};

// const chatGptApiCall = async (prompt, messages) => {
//   try {
//     const response = await client.post(chatGptApiLink, {
//       model: "gpt-3.5-turbo",
//       messages,
//     });
//     let answer = response.data?.choices[0]?.message?.content;
//     messages.push({ role: "assistant", content: answer.trim() });
//     return Promise.resolve({ success: true, data: messages });
//   } catch (err) {
//     console.log("error :", err);
//     return Promise.resolve({ success: false, msg: err.messages });
//   }
// };

// const dalleApiCall = async (prompt, messages) => {
//   try {
//     const response = await client.post(dalleApiLink, {
//       prompt,
//       n: 1,
//       size: "512x512",
//     });
//     let url = response.data?.data[0]?.url;
//     console.log('url:', url)
//     messages.push({ role: "assistant", content: url });
//     return Promise.resolve({ success: true, data: messages });
//   } catch (err) {
//     console.log("error :", err);
//     return Promise.resolve({ success: false, msg: err.messages });
//   }
// };
