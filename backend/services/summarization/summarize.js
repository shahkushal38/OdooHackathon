const pdfParse = require('pdf-parse')
const { TokenTextSplitter } = require('langchain/text_splitter')
const { Document } = require('langchain/document')
const { traceable } = require('langsmith/traceable')
const { ChatVertexAI } = require('@langchain/google-vertexai')
const { loadSummarizationChain } = require('langchain/chains')
const { PromptTemplate } = require('@langchain/core/prompts')

class Summarization {
  async contentSummarization (doc) {
    try {
      const readableText = await pdfParse(doc.buffer)
      const docs = [new Document({ pageContent: readableText.text })]
      const splitter = new TokenTextSplitter({
        chunkSize: 10000,
        chunkOverlap: 250
      })
      const docsSummary = await splitter.splitDocuments(docs)
      let summaryLogs
        const llmSummary = new ChatOpenAI({
          modelName: "gpt-4-turbo",
          temperature: 0,
          callbacks: [
            {
              async handleLLMEnd(output) {
                summaryLogs = output;
              },
            },
          ],
        });
    //   const llmSummary = new ChatVertexAI({
    //     temperature: 0,
    //     model: 'gemini-1.5-flash',
    //     maxOutputTokens: 8000,
    //     callbacks: [
    //       {
    //         async handleLLMEnd (output) {
    //           summaryLogs = output
    //         }
    //       }
    //     ]
    //   })
      const summaryTemplate = `
                You are an expert in summarizing documents.
                Your goal is to create a summary of these documents. Ensure that the summary covers all significant individuals, figures, occurrences, and relevant statistics mentioned across the documents
                Below you find the content of a document:
                --------
                {text}
                --------
      
                Total output will be a summary of the document.
      
                SUMMARY:
                `
      const SUMMARY_PROMPT = PromptTemplate.fromTemplate(summaryTemplate)
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
      let summary = ''
      const SUMMARY_REFINE_PROMPT = PromptTemplate.fromTemplate(
        summaryRefineTemplate
      )

      const llmSummarizer = traceable(async function callOpenAi (
        llm,
        summaryPrompt,
        summaryRefinePrompt
      ) {
        const summarizeChain = loadSummarizationChain(llm, {
          type: 'refine',
          verbose: true,
          questionPrompt: summaryPrompt,
          refinePrompt: summaryRefinePrompt
        })
        summary = await summarizeChain.run(docsSummary)
      })
      await llmSummarizer(llmSummary, SUMMARY_PROMPT, SUMMARY_REFINE_PROMPT)
      return {
        summary: summary,
        logs: summaryLogs.generations[0][0].message.usage_metadata
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new Summarization()