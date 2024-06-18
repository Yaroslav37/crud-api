import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userHobbies, setUserHobbies] = useState('');

  const handleGetUsers = () => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setData(data));
  };

  const handleGetUser = (event) => {
    event.preventDefault();
    fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(data => setData(data));
  };

  const handleDeleteUser = (event) => {
    event.preventDefault();
    fetch(`/api/users/${userId}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => setData(data));
  };

  const handleUpdateUser = (event) => {
    event.preventDefault();
    fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName })
    })
    .then(response => response.json())
    .then(data => setData(data));
  };

  const handleAddUser = (event) => {
    event.preventDefault();
    fetch(`/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userName, age: parseInt(userAge, 10), hobbies: userHobbies.split(',') })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => setData(data))
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleChangeName = (event) => {
    setUserName(event.target.value);
  };

  const handleChangeAge = (event) => {
    setUserAge(event.target.value);
  };

  const handleChangeHobbies = (event) => {
    setUserHobbies(event.target.value);
  };

  const handleChangeId = (event) => {
    setUserId(event.target.value);
  };

  return (
    <div className="App">
      <button onClick={handleGetUsers}>Get Users</button>
      <form onSubmit={handleGetUser}>
        <input type="text" value={userId} onChange={handleChangeId} placeholder="User ID" />
        <button type="submit">Get User</button>
      </form>
      <form onSubmit={handleDeleteUser}>
        <input type="text" value={userId} onChange={handleChangeId} placeholder="User ID" />
        <button type="submit">Delete User</button>
      </form>
      <form onSubmit={handleUpdateUser}>
        <input type="text" value={userId} onChange={handleChangeId} placeholder="User ID" />
        <input type="text" value={userName} onChange={handleChangeName} placeholder="User Name" />
        <button type="submit">Update User</button>
      </form>
      <form onSubmit={handleAddUser}>
        <input type="text" value={userName} onChange={handleChangeName} placeholder="User Name" />
        <input type="text" value={userAge} onChange={handleChangeAge} placeholder="User Age" />
        <input type="text" value={userHobbies} onChange={handleChangeHobbies} placeholder="User Hobbies (comma separated)" />
        <button type="submit">Add User</button>
      </form>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default App;