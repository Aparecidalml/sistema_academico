import axios from 'axios'

const apiBack = axios.create({

    // baseURL:"http://localhost:3000/",
    baseURL:"https://super-space-guide-x5vqr7wvgqjqhg54-3000.app.github.dev/",
    withCredentials:true

})

export default apiBack