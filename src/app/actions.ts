'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

export async function generatePlan(data: any) {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined");
  }

  // Initialize the specific client for this request (avoids global state issues)
  const genAI = new GoogleGenerativeAI(apiKey);

  // Using gemini-flash-latest (points to 1.5 Flash) which has the most generous free tier limits
  const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
  });

  const prompt = `
You are an expert fitness coach.
Generate a **SINGLE DAY** sample workout and diet plan.
This is a demo for a Free Tier usage. Keep it extremely brief.

User data:
${JSON.stringify(data, null, 2)}

Required JSON structure:
{
  "workoutPlan": {
    "summary": "1-sentence strategy",
    "schedule": [
      {
        "day": "Day 1",
        "focus": "Full Body",
        "exercises": [
           { "name": "Pushups", "sets": "3", "reps": "10", "rest": "60s" }
        ]
      }
    ]
  },
  "dietPlan": {
    "summary": "1-sentence diet goal",
    "meals": [
      {
        "type": "Breakfast",
        "options": ["Oats & Fruit"]
      }
    ]
  },
  "tips": ["Stay hydrated"],
  "motivation": "You got this!"
}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const rawText = response.text();

    // Extract JSON safely using the regex from your snippet
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON returned by model");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("generatePlan failed:", error);

    // Re-throw with a clean message while preserving the log
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to generate plan"
    );
  }
}
