import request from "../api/axiosInstance"


export interface User {
    email: string,
    password: string
}

export default {
    login: async (user: User) => {
        return await request.post('http://localhost:3000/authen',user)
    }
}