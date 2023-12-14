import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
`;

const UserItem = styled.li`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserName = styled.span`
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: #ff0000;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const SeeList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users from the server
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleDeleteUser = (userId) => {
    // Send a request to delete the user with the specified userId
    fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          // User deleted successfully, update the UI
          setUsers(users.filter((user) => user.id !== userId));
        } else {
          // Handle errors
          console.error('Failed to delete user');
        }
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  return (
    <Wrapper>
      <Title>List of Users</Title>
      <UserList>
        {users.map((user) => (
          <UserItem key={user.id}>
            <UserName>{user.username}</UserName>
            <DeleteButton onClick={() => handleDeleteUser(user.id)}>Delete</DeleteButton>
          </UserItem>
        ))}
      </UserList>
    </Wrapper>
  );
};

export default SeeList;
