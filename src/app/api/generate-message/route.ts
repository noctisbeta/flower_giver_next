import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize the Google Generative AI SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function POST(request: Request) {
  try {
    const { name, language } = await request.json();

    if (!name || !language) {
      return NextResponse.json(
        { error: "Name and language are required" },
        { status: 400 }
      );
    }

    // Create a prompt for Gemini API
    const prompt = `Write a cute story in the language ${language}, no more than 2 sentences long, 
        about a dragon giving a flower to ${name}. Make this random and fun!
        Important: Wrap any variation of the name ${name} with [NAME] tokens, 
        for example: [NAME]Peter[/NAME] or [NAME]Petra[/NAME].`;

    // Call Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Error generating message:", error);
    return NextResponse.json(
      { error: "Failed to generate message" },
      { status: 500 }
    );
  }
}
