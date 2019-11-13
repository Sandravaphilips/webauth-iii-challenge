import React, {useState, useEffect} from "react";
import withAuth from "../axios";

export default function Users(props) {
    const [users, setUsers] = useState([]);

    const {setIsAllowed} = props;

    useEffect(() => {
        withAuth().get('http://localhost:5000/api/restricted/users')
        .then(res => {
            setUsers(res.data);
            setIsAllowed(true)
        })
        .catch(err => { 
            console.log(err);
            setIsAllowed(false)
            props.history.replace('/login')
        })
    })

    return (
        <div>
            {
                users.map(user => 
                <p key={user.id}>{user.username}</p>)
            }
        </div>
    )
}