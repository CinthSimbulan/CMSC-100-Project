import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function SignUp() {
    const [user, setUsers] = useState([])
    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [lastname, setLastname] = useState('')
    const [usertype, setUsertype] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        axios.get('http://localhost:3001/register')
            .then((res) => {
                console.log(res.data)
            })
    }

    // To prevent the page from refreshing
    const handleRegister = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3001/register', { firstname, middlename, lastname, usertype, email, password })
            .then(() => {
                alert('Registratin successful')
                setFirstname('')
                setMiddlename('')
                setLastname('')
                setUsertype('')
                setEmail('')
                setPassword('')
                fetchUsers()
                navigate('/login')
            })
            .catch((error) => {
                console.log('Unable to register user')
            })
    }

    return (
        <div className='w-full h-screen flex'>
            <div className='w-[50%] h-[100%] bg-[#1a1a1a] text-white flex justify-center items-center'>
                <form className='text-center border rounded-lg w-[600px] h-[600px] p-9' onSubmit={handleRegister}>
                    {/* Firstname Input */}
                    <label>First name</label>
                    <br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                        type='text'
                        placeholder='First name'
                        value={firstname}
                        onChange={(e => setFirstname(e.target.value))} />
                    <br />
                    <br />
                    {/* Middlename Input */}
                    <label>Middle name</label>
                    <br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                        type='text'
                        placeholder='Middle name'
                        value={middlename}
                        onChange={(e => setMiddlename(e.target.value))} />
                    <br />
                    <br />
                    {/* Lastname Input */}
                    <label>Last name</label>
                    <br />
                    <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                        type='text'
                        placeholder='Last name'
                        value={lastname}
                        onChange={(e => setLastname(e.target.value))} />
                    <br />
                    <br />
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
                        type='submit'> Sign Up</button>
                </form>
            </div>
            <div className='w-[50%] h-[100%] flex justify-center items-center bg-teal-800'>
                <h2 className='text-3xl text-white'>SIGNUP</h2>
            </div>
        </div>
    )
}

export default SignUp
