// login.js

import { useState } from 'react';

const Login = () => {
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  });
  const base_url = process.env.REACT_APP_API_URL;
  const handleChange = (e) => {
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${base_url}user/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginUser),
      });
      const jsonResp = await resp.json();
      const token = jsonResp.token;
      localStorage.setItem('token', token);
      alert(jsonResp.message);
    } catch (error) {
      console.log(error);
      alert('ログイン失敗');
    }
  };
  return (
    <div>
      <h1 className="page-title">ログインページ</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={loginUser.email}
          onChange={handleChange}
          type="text"
          name="email"
          placeholder="メールアドレス"
          required
        />
        <input
          value={loginUser.password}
          onChange={handleChange}
          type="text"
          name="password"
          placeholder="パスワード"
          required
        />
        <button>ログイン</button>
      </form>
    </div>
  );
};

export default Login;
