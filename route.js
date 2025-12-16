import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { text, voice, ssml } = await req.json();

    if (!text || typeof text !== "string") {
      console.error("[TTS API] Invalid text format", text);
      return NextResponse.json({ error: "Missing or invalid text" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("[TTS API] Missing OPENAI_API_KEY environment variable");
      return NextResponse.json({ error: "Server not configured - missing API key" }, { status: 500 });
    }

    console.log("[TTS API] Processing text to speech");
    const openai = new OpenAI({ apiKey });

    // Use OpenAI TTS model to generate audio
    const createParams = {
      model: "tts-1",
      voice: voice || "alloy",
      input: text,
    };

    if (ssml) {
      // indicate to the SDK/server that the input contains SSML
      createParams.ssml = true;
    }

    const response = await openai.audio.speech.create(createParams);

    const buffer = await response.arrayBuffer();

    console.log("[TTS API] Successfully generated audio");
    return new Response(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": "inline; filename=voice.mp3",
      },
    });
  } catch (err) {
    console.error("[TTS API] Error:", err.message);
    return NextResponse.json({ error: "TTS generation failed: " + err.message }, { status: 500 });
  }
}
