import axios from "axios";

export default class UserService {

    static async login(request){
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/login`, request);
            return response.data;
        } catch (error) {
            console.error('Помилка при отриманні даних з сервера при авторизації:', error);
            throw error;
        }
    }

    static async registerUser(user){
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/register`, user);
            return response.data;
        } catch (error) {
            console.error('Помилка при отриманні даних з сервера при реєстрації:', error);
            throw error;
        }
    }

    static async createAdmin(user) {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };
            const response = await axios.post(`http://localhost:8000/api/v1/admin`, user, config);
            return response.data;
        } catch (error) {
            console.error('Помилка при отриманні даних з сервера:', error);
            throw error;
        }
    }

    static async editProfileById(id, post) {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };
            const response = await axios.put(`http://localhost:8000/api/v1/user/${id}`, post, config);
            return response.data;
        } catch (error) {
            console.error('Помилка при отриманні даних з сервера:', error);
            throw error;
        }
    }
}