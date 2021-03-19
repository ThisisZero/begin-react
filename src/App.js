import React, { useRef, useState, useMemo, useCallback } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...')
  return users.filter(user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username:'',
    email:'',
  });
  const { username, email } = inputs;
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }, [inputs]);
  const [users, setUsers] = useState([
      {
          id:1,
          username: '이건영',
          email:'coophtml@coopbiz.kr',
          active: true,
      },
      {
          id:2,
          username: '김민국',
          email:'coopspring@coopbiz.kr',
          active : false,
      },
      {
          id:3,
          username: '김광연',
          email:'coopvideo@coopbiz.kr',
          active: false,
      }
  ]);

  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    const user = {
      id:nextId.current,
      username,
      email,
    }
    setUsers(users => users.concat(user));
    setInputs({
      username:'',
      email:''
    });
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback(id => {
    setUsers(users => users.filter(user => user.id !== id));
  }, [])

  const onToggle = useCallback(id => {
    setUsers(users => users.map(
      user => user.id === id
        ? { ...user, active: !user.active }
        : user
    ));
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser 
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList
        users={users}
        onRemove={onRemove}
        onToggle={onToggle}
      />
      <div>활성 사용자수 : <b>{count}</b></div>
    </>
  );
}

export default App;
