import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [error, setError] = useState('');


    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        axios.get('http://localhost:3001/register')
            .then((res) => {
                console.log(res.data)
            })
    }


    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { email, password })
            console.log('HANDLE LOGIN')
            console.log(response.data)
            const token = response.data.token
            const usertype = response.data.usertype
            const firstname = response.data.firstname
            const lastname = response.data.lastname
            const uemail = response.data.userEmail
            console.log('Local storage firstname: ', firstname)
            console.log('Local storage email: ', uemail)
            localStorage.setItem('token', token);
            localStorage.setItem('usertype', usertype);
            localStorage.setItem('firstname', firstname);
            localStorage.setItem('lastname', lastname);
            localStorage.setItem('email', uemail);
            alert('Login successful')
            setEmail('')
            setPassword('')
            fetchUsers();
            if (usertype === 'Customer') {
                navigate('/main')
            } else {
                navigate('/admin')
            }
            window.location.reload()
        } catch (error) {
            console.log(error)
            setError('Invalid username or password')
        }
    }

    return (
        <div className='w-full h-screen flex justify-center items-center bg-gray-900'>
            <div className='w-1/3 bg-[#1a1a1a] border text-white flex rounded-lg shadow-lg'>
                <form className="p-2 w-full" onSubmit={handleLogin}>
                    <p className='w-full p-2 text-lg text-center'>LOGIN</p>
                    {error && <p className='text-red-500 flex justify-center'>{error}</p>}
                    <div className='p-1'>
                        <p className='m-1'>Email</p>
                        <input className='w-full rounded-md bg-zinc-700 p-2'
                            type='text'
                            placeholder='Email'
                            value={email}
                            onChange={(e => setEmail(e.target.value))} />
                    </div>
                    <div className='p-1'>
                        <p>Password</p>
                        <input className='w-full rounded-md bg-zinc-700 p-2'
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e => setPassword(e.target.value))} />
                    </div>
                    <Link to='/signup' className='p-2.5 text-sm underline italic'>Don't have an account yet? Register here</Link>
                    <Link to='/' className='p-2.5 text-sm underline italic'>Back to home</Link>
                    <div className='w-full p-2 my-2 text-center'>
                        <button className='w-1/2 p-2 border hover:bg-teal-900' type='submit'>
                            Login
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
