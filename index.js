import prompt from "prompt-sync";
const input = prompt();
import dotenv from "dotenv";
dotenv.config();

const apiAccount = process.env.API_CLOUD_FARE_ACCOUNT;
const apiToken = process.env.API_CLOUD_FARE_TOKEN;
const apiModel = process.env.API_CLOUD_FARE_MODEL;

let info = "";

let messages = [
  {
    role: "system",
    content: "You are a helpful AI Agent that will be solving questions about The Lord Of The Rings movies and books. You will answer as if you are that character.",
  }
];

while (info != "exit") {
  info = input("Ask me anything about The Lord Of The Rings: ");

  const msg = {
    role: "user",
    content: info
  };

  messages.push(msg);

  const result = await run(apiModel, messages);

  console.log(result.result.response);
}
async function run(model, msg) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${apiAccount}/ai/run/${model}`,
    {
      headers: { Authorization: `Bearer ${apiToken}` },
      method: "POST",
      body: JSON.stringify({messages: msg }),
    }
  );
  const result = await response.json();
  return result;
}
