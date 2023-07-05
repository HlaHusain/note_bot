const { Configuration, OpenAIApi, RateLimitError} = require("openai");
//const backoff = require('backoff');
// const HttpError = require("../model/http-error");

const openAIConfig = new Configuration({
    organization: "org-65qL0uV70AbvbEVHEZcr9iD8",
    apiKey: "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",
});

const openapi = new OpenAIApi(openAIConfig);

const chatCompletion = async (req, res, next) => {
    try {
        const prompt = req.body.prompt;
    
        const response = await openapi.createCompletion({
          model: "text-davinci-003",
          prompt: `${prompt}`,
          temperature: 0, // Higher values means the model will take more risks.
          max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
          top_p: 1, // alternative to sampling with temperature, called nucleus sampling
          frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
          presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
        });
    
        res.status(200).send({
          bot: response.data.choices[0].text
        });
    
      } catch (error) {
        console.error(error)
        res.status(500).send(error || 'Something went wrong');
      }
    };
    
// const chatCompletion = async (req, res) => {
//     try {
//       const { prompt } = req.body;
  
//       const answer = await makeAPIRequestWithRateLimit(prompt);
  
//       const text = answer.choices[0].text;
  
//       res.status(200).json({ text });
//     } catch (err) {
//       res.status(500).json({
//         message: err.message,
//       });
//     }
//   };
  
//   const makeAPIRequestWithRateLimit = async (prompt) => {
//     const maxRetries = 5;
//     let retryDelay = 1000;
  
//     for (let retry = 0; retry < maxRetries; retry++) {
//       try {
//         const answer = await openapi.createCompletion({
//           model: "text-davinci-003",
//           prompt: `${prompt}`,
//           temperature: 0,
//           max_tokens: 3000,
//           top_p: 1,
//           frequency_penalty: 0.5,
//           presence_penalty: 0,
//         });
  
//         return answer;
//       } catch (error) {
//         if (error.response && error.response.status === 429) {
//           await wait(retryDelay);
//           retryDelay *= 2;
//         } else {
//           throw error;
//         }
//       }
//     }
//     throw new Error("Rate limit exceeded, and maximum retries reached.");
//   };
  
//   const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  
  exports.chatCompletion = chatCompletion;