import React, {useState} from 'react';
import axios from 'axios';

const initialFormValues = {
    username: '',
    password: ''
}

export default function SignIn(props) {
    const [formValues, setFormValues] = useState(initialFormValues);

    const {isAllowed} = props;
    function onInputChange(e) {
        e.preventDefault();
        setFormValues({...formValues, [e.target.name]: e.target.value});
    }

    function onFormSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/api/login', formValues)
        .then(({data}) => {
            localStorage.setItem('token', data.payload);
            props.history.replace('/users')
        })
        .catch(err => alert(err.message))
    }

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <label>
                    Username
                    <input type='text' value={formValues.username} onChange={onInputChange} name="username" />
                </label>

                <label>
                    Password
                    <input type='text' value={formValues.password} onChange={onInputChange} name="password" />
                </label>

                <button>Login</button>
            </form>

            {
                (!isAllowed) && 
                <p>Looks like there was an error with your credentials. Please enter them and try again</p>
            }
        </div>
    )
}
