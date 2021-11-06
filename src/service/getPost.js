// import axios from 'axios'

// export const getPost = async () => {
//   const response = await axios.get('http://localhost:3000/users')

//   return response.data
// }

class GetPost {
  constructor(httpClient) {
    this.getPost = httpClient
  }

  async recentGames() {
    const response = await this.getPost.get('http://localhost:3000/games')

    return response.data
  }

  async getUsers() {
    const response = await this.getPost.get('users')
    return response.data
  }
}
export default GetPost
