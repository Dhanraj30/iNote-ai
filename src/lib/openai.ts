/*//import { Configuration, OpenAIApi } from "openai-edge";
import OpenAI from "openai";
//const config = new Configuration({
  //apiKey: process.env.OPENAI_API_KEY,
//});

//const openai = new OpenAIApi(config);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateImagePrompt(name: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an creative and helpful AI assistance capable of generating interesting thumbnail descriptions for my notes. Your output will be fed into the DALLE API to generate a thumbnail. The description should be minimalistic and flat styled",
        },
        {
          role: "user",
          content: `Please generate a thumbnail description for my notebook titles ${name}`,
        },
      ],
    });
    // Debugging: Log the full API response
    console.log("OpenAI Response:", response);
    // Validate response structure
    if (!response.choices || response.choices.length === 0 || !response.choices[0].message) {
      throw new Error("Unexpected API response structure: " + JSON.stringify(response));
    }
    const image_description = response.choices[0].message.content;
    return image_description as string;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function generateImage(image_description: string) {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: image_description,
      n: 1,
      size: "1024x1024", // Changed size to a supported one
    });
    console.log(response.data[0].url);
    const image_url = response.data[0].url;
    return image_url as string;
  } catch (error) {
    console.error(error);
  }
}
*/


import { HfInference } from "@huggingface/inference";
import { GoogleGenerativeAI } from "@google/generative-ai";
//import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
// Initialize Hugging Face with your access token
const hf = new HfInference(process.env.HUGGING_FACE_ACCESS_TOKEN!);

export async function generateImagePrompt(name: string): Promise<string> {
  try {
    const prompt = `You are a creative and helpful AI assistant capable of generating interesting thumbnail descriptions for my notes. Your output will be fed into an image generation API to generate a thumbnail. The description should be minimalistic and flat styled. Please generate a thumbnail description for my notebook titled "${name}".`;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // Use a lighter text generation model
    const response = await model.generateContentStream(prompt);
    // Read the stream and concatenate the chunks
    let image_description = "";
    for await (const chunk of response.stream) {
      const chunkText = chunk.text();
      image_description += chunkText;
    }
    console.log("Gemini AI Response:", image_description);
    //console.log(response.generated_text.trim());
    if (!image_description) {
      throw new Error("No response from Gemini AI");
    }
    return image_description as string;
   // console.log(response.generated_text.trim());

    //return imageDescription;
  } catch (error) {

    console.error("Error generating image prompt:", error);
    throw error;
  }
}

export async function generateImage(image_description: string): Promise<string> {
//export const generateImage = async (image_description: string) => {
  try {
    // Use a text-to-image model
    const response = await hf.textToImage({
      model: "runwayml/stable-diffusion-v1-5", // Replace with a model that returns a URL
      inputs: image_description,
      parameters: {
        height: 512, // Adjust the image size
        width: 512,
        num_inference_steps: 50, // Adjust the number of inference steps for better quality
      },
    });
    console.log("Hugging Face API response:", response);

     // Check if the response is a Blob or a URL
     if (response instanceof Blob) {
      // Convert the Blob to a base64 string and create a data URL
      const arrayBuffer = await response.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      const imageUrl = `data:image/png;base64,${base64}`;
      return imageUrl;
    } else if (typeof response === "string") {
      // If the response is a URL, return it directly
      return response;
    } else {
      throw new Error("Unexpected response format from Hugging Face API");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Error generating image");
  }
}
