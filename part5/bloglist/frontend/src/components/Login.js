import React, {useState} from 'react'


const Login = ({handleLogin}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = (e) => {
        e.preventDefault()

        handleLogin({
            username: username,
            password: password
        })

        setUsername('')
        setPassword('')
    }
    

    return (
        <div>
            <form onSubmit={loginHandler}>
                <div>
                    username: <input id="username" type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    password: <input id="password" type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button id="login-button" type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login