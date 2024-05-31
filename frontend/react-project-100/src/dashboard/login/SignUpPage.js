import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


function SignUp() {
    const [user, setUsers] = useState([])
    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [lastname, setLastname] = useState('')
    const [usertype, setUsertype] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
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

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validatePassword = (password) => {
        if (password.length < 8) {
            return false;
        }
        return (password);
    }


    // To prevent the page from refreshing
    const handleRegister = (event) => {
        event.preventDefault()

        if (!firstname || !lastname || !email || !password) {
            setError('Please fill in all required fields.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.')
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be atleast 8 characters.')
            return;
        }

        axios.post('http://localhost:3001/register', { firstname, middlename, lastname, usertype, email, password })
            .then(() => {
                alert('Registration successful')
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
                console.log('Unable to register user', error);
                setError('Email already exists'); // To show the error
            })
    }

    return (
        <div className='w-full h-screen flex justify-center items-center bg-gray-900'>
            <div className='w-1/3 bg-[#1a1a1a] border text-white flex rounded-lg shadow-lg'>
                <form className="p-2 w-full" onSubmit={handleRegister}>
                    <p className='w-full p-2 text-xl text-center'>REGISTER</p>
                    {error && <p className='text-red-500'>{error}</p>}
                    <div className='p-1'>
                        <p className='m-1'>First Name</p>
                        <input className='w-full rounded-md bg-zinc-700 p-2'
                            type='text'
                            placeholder='First Name'
                            value={firstname}
                            onChange={(e => setFirstname(e.target.value))} />
                    </div>
                    <div className='p-1'>
                        <p className='m-1'>Middle Name</p>
                        <input className='w-full rounded-md bg-zinc-700 p-2'
                            type='text'
                            placeholder='Middle Name'
                            value={middlename}
                            onChange={(e => setMiddlename(e.target.value))} />
                    </div>
                    <div className='p-1'>
                        <p className='m-1'>Last Name</p>
                        <input className='w-full rounded-md bg-zinc-700 p-2'
                            type='text'
                            placeholder='Last Name'
                            value={lastname}
                            onChange={(e => setLastname(e.target.value))} />
                    </div>
                    <div className='p-1'>
                        <p className='m-1'>Email</p>
                        <input className='w-full rounded-md bg-zinc-700 p-2'
                            type='text'
                            placeholder='Email'
                            value={email}
                            onChange={(e => setEmail(e.target.value))} />
                    </div>
                    <div className='p-1'>
                        <p className='m-1'>Password</p>
                        <input className='w-full rounded-md bg-zinc-700 p-2'
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e => setPassword(e.target.value))} />
                    </div>
                    <Link to='/login' className='p-2.5 text-sm underline italic'>Back to login</Link>
                    <div className='w-full p-2 my-2 text-center'>
                        <button className='w-1/2 p-2 border hover:bg-teal-900' type='submit'>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
