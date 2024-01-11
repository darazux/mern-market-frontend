// login.js

import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const base_url = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${base_url}user/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
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
      <h1>ログインページ</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          placeholder="メールアドレス"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
