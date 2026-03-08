import {GoogleGenAI} from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
export const generateOutline = async (req, res) => {
//console.log("key",process.env.GOOGLE_API_KEY);
    try {
    const { topic, style, numChapters, description } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Please provide topic" });
    }

    if (!process.env.GOOGLE_API_KEY) {
      return res.status(500).json({ message: "Google API key missing" });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY
    });

    const prompt = `You are an expert book outline generator...
    Topic: ${topic}
    ${description ? `Description: ${description}` :""}
    Writing Style: ${style}
    Number of Chapters: ${numChapters || 5}
    Return ONLY valid JSON array.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    });

    const text = response.text;
   console.log("Raw AI response:",text);
    const startIndex = text.indexOf("[");
    const endIndex = text.lastIndexOf("]");

    if (startIndex === -1 || endIndex===-1) {
      return res.status(500).json({
        message: "Failed to parse AI response"
      });
    }

    const outline = JSON.parse(text.substring(startIndex, endIndex + 1));
    res.status(200).json({ outline });
    
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: "Server error during AI outline generation" });
  }
};


export const generateChapterContent = async(req,res)=>{
    try{
           const {chapterTitle, chapterDescription, style} = req.body;
           if(!chapterTitle){
            return res  
                .status(400)  
                .json({ message: "Please provide a chapter title" });
           }
       
         const ai = new GoogleGenAI({
         apiKey: process.env.GOOGLE_API_KEY
    });
        const prompt = `You are an expert writer specializing in ${style} content. Write a complete chapter for a book with the following specifications:

        Chapter Title: "${chapterTitle}"
        ${chapterDescription ? `Chapter Description: ${chapterDescription}` : ""}
        Writing Style: ${style}
        Target Length: Comprehensive and detailed (aim for 1500-2500 words)

        Requirements:
        1. Write in a ${style.toLowerCase()} tone throughout the chapter
        2. Structure the content with clear sections and smooth transitions
        3. Include relevant examples, explanations, or anecdotes as appropriate for the style
        4. Ensure the content flows logically from introduction to conclusion
        5. Make the content engaging and valuable to readers
        ${chapterDescription ? `6. Cover all points mentioned in the chapter description: ${chapterDescription}` : ""}  
        
        Format Guidelines:
        - Start with a compelling opening paragraph
        - Use clear paragraph breaks for readability
        - Include subheadings if appropriate for the content length
        - End with a strong conclusion or transition to the next chapter
        - Write in plain text without markdown formatting

        Begin writing the chapter content now:`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });
         console.log("AI Chapter Content Response:", response.text);
        res.status(200).json({ content: response.text });
    }
    catch(err){
   res.status(500).json({"message":"Server error during AI chapter generation"});
    }
}
