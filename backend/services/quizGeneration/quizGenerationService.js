const youtubeTranscript = require("youtube-transcript")
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY2,
});


class Quiz {
    async createQuiz(videoLink) {
        console.log("VIDEOLINK", videoLink)
        try {
            const transcriptArray = await youtubeTranscript.YoutubeTranscript.fetchTranscript(videoLink)
            let concatenatedString = '';
            for (let obj of transcriptArray) {
            concatenatedString += obj.text + ' ';
        }
        let prompt = `You are given a transcript of a YouTube video. Your task is to create five multiple-choice quiz questions based on the content of the transcript. Each question should have four answer options with one correct answer. Format the output as a JSON array with the following structure:
    
    [
        {
            "question": "First question text",
            "options": [
                "Option A",
                "Option B",
                "Option C",
                "Option D"
            ],
            "correct_answer": "Option A"
        },
        {
            "question": "Second question text",
            "options": [
                "Option A",
                "Option B",
                "Option C",
                "Option D"
            ],
            "correct_answer": "Option B"
        },
        {
            "question": "Third question text",
            "options": [
                "Option A",
                "Option B",
                "Option C",
                "Option D"
            ],
            "correct_answer": "Option C"
        },
        {
            "question": "Fourth question text",
            "options": [
            "Option A","Option B","Option C","Option D"],"correct_answer": "Option D" }, {"question": "Fifth question text","options": ["Option A","Option B", "Option C","Option D"], "correct_answer": "Option A"}]`
    
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: prompt,
            },
            {
              role: "user",
              content: `Use the following transcript to generate the questions and answers: ${concatenatedString}`,
            },
          ],
          temperature: 0,
          response_format: {
            type: "json_object",
          },
        });
        return response.choices[0].message.content;
        } catch (error) {
            console.log("ERRR", error)
            
        }
  
    }
}
module.exports = new Quiz()