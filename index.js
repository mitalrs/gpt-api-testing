const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

app.post("/gptapi", async (req,res) =>{
  try{
    const { prompt } = req.body;
    const response = await openai.createCompletion({
  model: "text-davinci-001",
  prompt: `${prompt}
  The time complexity of this function is
  ###
  `,
       temperature: 0.4,
  max_tokens: 64,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
    
    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text
    });
  }
  catch(err){
    return res.status(400).json({
      success: false,
      error: err.response ? err.response.data : "there was an issue",
    });
  }
});

const port = 1212;

app.listen(port, ()=> console.log("server is running on",port));