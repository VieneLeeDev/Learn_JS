import request from "../api/axiosInstance"

export default {
    getAll: async () => {
        return await request.get('http://localhost:3000/products')
    }
}