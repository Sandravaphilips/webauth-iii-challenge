import Axios from "axios";


export default function withAuth() {
    const token = localStorage.getItem('token');

    const instance = Axios.create({
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    });

    return instance;
}