import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();


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
                navigate('/account')
            } else {
                navigate('/admin')
            }
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full h-screen flex'>
            <div className='w-[50%] h-[100%] bg-[#1a1a1a] text-white flex justify-center items-center'>
                <form className='text-center border rounded-lg w-[600px] h-[400px] p-9' onSubmit={handleLogin}>
                    {/* Email Input */}
                    <label>Email</label>
                    <br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e => setEmail(e.target.value))} />
                    <br />
                    <br />
                    <label>Password</label>
                    <br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e => setPassword(e.target.value))} />
                    <br />
                    <br />
                    {/* Button */}
                    <button className='w-[200px] h-[50px] border hover:bg-teal-900'
                        type='submit'> Login </button>
                </form>
            </div>
            <div className='w-[50%] h-[100%] flex justify-center items-center bg-teal-800'>
                <h2 className='text-3xl text-white'>LOGIN</h2>
            </div>
        </div>
    )
}

export default Login
