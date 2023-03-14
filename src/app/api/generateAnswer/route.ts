import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export async function GET(request: Request) {
  return new Response("Hello, gen ans!");
}

interface GenerateNextApiRequest extends NextApiRequest {
  json: Function;
}

export async function POST(req: GenerateNextApiRequest, res: NextApiResponse) {
  console.log("API POST ANSWER GENERATOR");
  let body = await req.json();
  const prompt = body.prompt;
  console.log("prompt: ", prompt);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `write me a cringy motivational quote about ${prompt}`,
    max_tokens: 300,
    temperature: 1,
  });

  const responseText =
    response.data.choices[0].text?.trim() || "Sorry, there was a a problem!";
  console.log("response: ", responseText);
  return NextResponse.json({ response: responseText });
}
