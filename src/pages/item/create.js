// create.js

import { useState } from 'react';
import ImgInput from '../../components/imgInput';
import useAuth from '../../utils/useAuth';

const CreateItem = () => {
  const [newItem, setNewItem] = useState({
    title: '',
    price: '',
    image: '',
    description: '',
  });
  const handleChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };
  const setImage = (data) => {
    setNewItem({
      ...newItem,
      image: data,
    });
  };
  const base_url = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${base_url}item/create`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newItem),
      });
      const jsonData = await resp.json();
      alert(jsonData.message);
    } catch (error) {
      console.log(error);
      alert('アイテム作成失敗');
    }
  };
  const loginUser = useAuth();
  if (loginUser) {
    return (
      <div>
        <h1 className="page-title">アイテム作成</h1>
        <ImgInput setImage={setImage} />
        <form onSubmit={handleSubmit}>
          <input
            value={newItem.title}
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="アイテム名"
            required
          />
          <input
            value={newItem.price}
            onChange={handleChange}
            type="text"
            name="price"
            placeholder="価格"
            required
          />
          <input
            value={newItem.image}
            onChange={handleChange}
            type="text"
            name="image"
            placeholder="画像"
            required
          />
          <textarea
            value={newItem.description}
            onChange={handleChange}
            type="text"
            name="description"
            rows="15"
            placeholder="商品説明"
            required
          ></textarea>
          <button>作成</button>
        </form>
      </div>
    );
  }
};

export default CreateItem;
