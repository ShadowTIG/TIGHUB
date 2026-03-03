
import { GoogleGenAI } from "@google/genai";

/**
 * Helper to initialize GoogleGenAI with the required API key from environment.
 */
const getAi = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// AI Services for presentation have been removed to focus on App Console features.
