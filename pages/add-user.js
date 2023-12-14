import React, { useState } from 'react';

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 

    const handleAddUser = () => {
        // Send a POST request to the server to add the new user
        fetch('/api/add-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        })
            .then((response) => {
                if (response.status === 201) {
                    // User added successfully
                    console.log('User added successfully');
                } else {
                    // Handle errors
                    console.error('Failed to add user');
                }
            })
            .catch((error) => {
                // Handle network or other errors
                console.error('Network error:', error);
            });
    };

    return (
        <div>
            <h1>Add New User</h1>
            <form>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
          
                <button type="button" onClick={handleAddUser}>
                    Add User
                </button>
            </form>
        </div>
    );
};

export default AddUser;
