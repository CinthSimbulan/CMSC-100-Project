import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminUsers() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    try {
      let url = 'http://localhost:3001/register';
      const response = await axios.get(url);
      let usersFromDatabase = response.data;
      setUsers(usersFromDatabase)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  return (
    <div>
      <div>
        {users.map((user) => (
          <div key={user._id}>
            <ul>
              <li className='text-xl'>
                {user.firstname} {user.middlename} {user.lastname} {user.usertype} {user.email}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminUsers
