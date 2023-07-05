const { Configuration, OpenAIApi } = require("openai");
const OPENAI_KEY = "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";

const openAIConfig = new Configuration({
  apiKey: OPENAI_KEY
});

const openapi = new OpenAIApi(openAIConfig);

// Define a function to handle chat completions and manage rate limits
const chatCompletion = async (req, res) => {
  try {
    const { prompt } = req.body;

    const answer = await makeAPIRequestWithRateLimit(prompt);

    const text = answer.data.choices[0].text;

    res.status(200).json({ text });

   } catch (err) {
     res.status(500).json({
       message: err.message
     });
   }
};

const makeAPIRequestWithRateLimit = async (prompt) => {
    const maxRetries = 3; // Maximum number of retries before giving up
    let retryDelay = 1000; // Initial retry delay in milliseconds (1 second)
  
    for (let retry = 0; retry < maxRetries; retry++) {
      try {
        const answer = await openapi.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0, // Higher values means the model will take more risks.
            max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
            top_p: 1, // alternative to sampling with temperature, called nucleus sampling
            frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
            presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
        });
  
        return answer; // Return the response if successful
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // Rate limit reached, wait for the specified time and then retry
          await wait(retryDelay);
          retryDelay *= 2; // Increase the retry delay exponentially with each retry
        } else {
          throw error; // Throw the error if it's not a rate limit issue
        }
      }
    }
    throw new Error("Rate limit exceeded, and maximum retries reached.");
  };
  
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
exports.chatCompletion = chatCompletion;