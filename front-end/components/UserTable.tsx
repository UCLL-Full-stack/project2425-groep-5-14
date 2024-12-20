import React from 'react';

const users = [
  { username: 'admin', password: 'adminpassword', role: 'admin' },
  { username: 'user1', password: 'user1password', role: 'user' },
  { username: 'user2', password: 'user2password', role: 'user' },
  { username: 'user3', password: 'user3password', role: 'user' },
];

const UserTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Password</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.username}</td>
            <td>{user.password}</td>
            <td>{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;