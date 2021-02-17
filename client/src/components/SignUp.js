import React, {useState} from 'react';
import axios from 'axios';

const initialFormValues = {
    username: '',
    password: '',
    department: ''
}

export default function SignUp(props) {
    const [formValues, setFormValues] = useState(initialFormValues);

    function onInputChange(e) {
        e.preventDefault();
        setFormValues({...formValues, [e.target.name]: e.target.value});
    }

    function onFormSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/api/register', formValues)
        .then(() => {
            props.history.replace('/login')
        })
        .catch(err => console.log(err))
    }

    return (
        <form onSubmit={onFormSubmit}>
            <label>
                Username
                <input type='text' value={formValues.username} onChange={onInputChange} name="username" />
            </label>

            <label>
                Department
                <input type='text' value={formValues.department} onChange={onInputChange} name="department" />
            </label>

            <label>
                Password
                <input type='text' value={formValues.password} onChange={onInputChange} name="password" />
            </label>

            <button>Register</button>
        </form>
    )
}
