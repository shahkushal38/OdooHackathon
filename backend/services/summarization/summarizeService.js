const pdfParse = require('pdf-parse')
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY2,
});
const langsmith_trace = require("langsmith/traceable");
const langchainTextSplitter = require("langchain/text_splitter");
const langchainDocument = require("langchain/document");
const chatGpt = require("@langchain/openai");
const chains = require("langchain/chains");
const promptTemplate = require("@langchain/core/prompts");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const youtubeTranscript = require("youtube-transcript")



class Summarization {

  // Function to concatenate values of 'text' key
async concatenateTextValues(jsonArray) {
  let concatenatedString = '';
  for (let obj of jsonArray) {
      concatenatedString += obj.text + ' ';
  }
  console.log("concatenatedString",concatenatedString)
  return concatenatedString.trim(); // Trim to remove trailing space
}

  async createSummaryFromDoc(doc){
    try {
      doc = doc[0]
      const readableText = await pdfParse(doc.buffer)
      return this.createSummary(readableText.text)
    } catch (error) {
      console.log(error);
    }
  }

  async createSummaryFromVideo(videoURL){
    try{
      console.log("videoURL",videoURL)
      const transcriptArray = await youtubeTranscript.YoutubeTranscript.fetchTranscript(videoURL)
      let concatenatedString = '';
      for (let obj of transcriptArray) {
      concatenatedString += obj.text + ' ';
  }
      return this.createSummary(concatenatedString)
    }catch (error) {
      console.log(error);
    }
  }

  async createSummary(text) {
    try {
      console.log("Creating Summary");
      const llm_tracer = await langsmith_trace;
      const text_splitter = await langchainTextSplitter;
      const doc_worker = await langchainDocument;
      const chat_gpt = await chatGpt;
      const insight_chain = await chains;
      const prompt_template = await promptTemplate;
      // extract text from pdf file
      //let pdfData = await pdf_parse(pdf);
      // const readableText = await pdfParse(doc.buffer)
      // console.log("readableText",readableText);
      const docs = [new doc_worker.Document({ pageContent: text })];
      const splitter = new text_splitter.TokenTextSplitter({
        chunkSize: 10000,
        chunkOverlap: 250,
      });
      const docsSummary = await splitter.splitDocuments(docs);
      let summary_logs;
      const llmSummary = new chat_gpt.ChatOpenAI({
        modelName: "gpt-4o",
        temperature: 0,
        callbacks: [
          {
            async handleLLMEnd(output) {
              summary_logs = output;
            },
          },
        ],
      });
      const summaryTemplate =  `
      You are an expert in summarizing documents.
      Your goal is to create a summary of these documents. Ensure that the summary covers all significant individuals, figures, occurrences, and relevant statistics mentioned across the documents
      Below you find the content of a document:
      --------
      {text}
      --------

      Total output will be a summary of the document.

      SUMMARY:
      `

      const SUMMARY_PROMPT =
        prompt_template.PromptTemplate.fromTemplate(summaryTemplate);

      const summaryRefineTemplate = `
                You are an expert in summarizing Documents.
                Your goal is to create a summary of these documents. Ensure that the summary covers all significant individuals, figures, occurrences, and relevant statistics mentioned across the articles
                We have provided an existing summary up to a certain point: {existing_answer}
      
                Below you find the content of a document:
                --------
                {text}
                --------
      
                Given the new context, refine the summary.
                If the context isn't useful, return the original summary.
                Total output will be a summary of the article.
      
                SUMMARY
                `

      const INSIGHTS_REFINE_PROMPT =
        prompt_template.PromptTemplate.fromTemplate(summaryRefineTemplate);
      let summary = "";
      const llm_summariser = llm_tracer.traceable(async function callOpenAi(
        llm,
        summary_prompt,
        summary_refine_prompt
      ) {
        const summarizeChain = insight_chain.loadSummarizationChain(llm, {
          type: "refine",
          verbose: true,
          questionPrompt: summary_prompt,
          refinePrompt: summary_refine_prompt,
        });
        summary = await summarizeChain.run(docsSummary);
      });
      await llm_summariser(llmSummary, SUMMARY_PROMPT, INSIGHTS_REFINE_PROMPT);
      return summary;
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new Summarization()