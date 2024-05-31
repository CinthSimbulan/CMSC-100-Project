import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UsersPage() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    try {
      let url = 'http://localhost:3001/register';
      const response = await axios.get(url);
      let usersFromDatabase = response.data;
      setUsers(usersFromDatabase)
      setFilteredUsers(usersFromDatabase);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  // This is to handle the search input | Gets the value then filters the users depending on the value
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = users.filter((user) =>
      user.firstname.toLowerCase().includes(searchTerm) ||
      user.middlename.toLowerCase().includes(searchTerm) ||
      user.lastname.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="flex flex-col">
      <div className='flex bg-green-600 h-20 items-center justify-between'>
        <div className='flex'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 ml-5 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <span className='text-white font-black text-4xl ml-5'>User accounts</span>
        </div>
        <input
          type='search'
          className="border-2 border-gray-200 p-2 rounded-full placeholder:p-3 mx-3"
          placeholder="Search user"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className='flex justify-between mt-10'>
        <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>First Name</span>
        <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>Middle Name</span>
        <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>Last Name</span>
        <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>User Type</span>
        <span className='flex flex-1 text-lg text-green-700 h-10 justify-center items-center mx-4 bg-green-200 rounded-lg font-extrabold'>Email</span>
      </div>
      <div className='mt-5'>
        {filteredUsers.map((user) => (
          <div className='flex justify-evenly' key={user._id}>
            <span className='flex flex-1 justify-center text-center items-center h-12 pb-2 bg-green-400 text-white mx-1 mb-2'>{user.firstname}</span>
            <span className='flex flex-1 justify-center text-center items-center h-12 pb-2 bg-green-400 text-white mx-1 mb-2'>{user.middlename}</span>
            <span className='flex flex-1 justify-center text-center items-center h-12 pb-2 bg-green-400 text-white mx-1 mb-2'>{user.lastname}</span>
            <span className='flex flex-1 justify-center text-center items-center h-12 pb-2 bg-green-400 text-white mx-1 mb-2'>{user.usertype}</span>
            <span className='flex flex-1 justify-center text-center items-center h-12 pb-2 bg-green-400 text-white mx-1 mb-2'>{user.email}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UsersPage;