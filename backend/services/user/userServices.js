class User {
    async login () {
      try {
        const response = await this.User() // async function called
        return response
      } catch (err) {
        console.log('Error in checkUser function :: err', err)
        throw new Error(err)
      }
    }
  }
  
  module.exports = new User()
  