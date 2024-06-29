const express = require('express')
const router = express.Router()
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const quizService = require('../../services/quizGeneration/quizGenerationService')


/**
 * @namespace -HEALTH-CHECK-MODULE-
 * @description API’s related to HEALTH CHECK module.
 */
/**
 * @memberof -HEALTH-CHECK-module-
 * @name getPing
 * @path {GET} /api/healthCheck/getPing
 * @description Bussiness Logic :- In getPing API, we are just returning the sucess response and data true.
 * @response {string} ContentType=application/json - Response content type.
 * @response {string} metadata.msg=Success  - Response got successfully.
 * @response {string} metadata.data - It will return the data.
 * @code {200} if the msg is success the api returns succcess message.
 * @author Vasim Gujrati, 14th December 2022
 * *** Last-Updated :- Vasim Gujrati, 20th March 2023 ***
 */
const validationSchema = {}
const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'body')
}
const generateQuiz  = async (req, res) => {
  try {
    const response = await quizService.createQuiz(req.body.videos)
    res.sendJson({ type: __constants.RESPONSE_MESSAGES.SUCCESS, data: response })
  } catch (err) {
    return res.sendJson({ type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR, err: err.err || err })
  }
}
router.post('/generateQuiz', validation, generateQuiz)
module.exports = router
