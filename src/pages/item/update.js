// update.js

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../utils/useAuth';

const UpdateItem = () => {
  const base_url = process.env.REACT_APP_API_URL;
  const params = useParams();
  const [updateItem, setUpdateItem] = useState({
    title: '',
    price: '',
    image: '',
    description: '',
  });
  useEffect(() => {
    const getSingleItem = async () => {
      try {
        const resp = await fetch(`${base_url}item/${params.id}`);
        const jsonResp = await resp.json();
        setUpdateItem({
          id: jsonResp.singleItem._id,
          title: jsonResp.singleItem.title,
          image: jsonResp.singleItem.image,
          price: jsonResp.singleItem.price,
          description: jsonResp.singleItem.description,
          email: jsonResp.singleItem.email,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getSingleItem();
  }, [params.id]);
  const handleChange = (e) => {
    setUpdateItem({
      ...updateItem,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${base_url}item/update/${params.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updateItem),
      });
      const jsonData = await resp.json();
      alert(jsonData.message);
    } catch (error) {
      console.log(error);
      alert('アイテム編集失敗');
    }
  };
  const loginUser = useAuth();
  if (loginUser === updateItem.email) {
    return (
      <div>
        <h1>アイテム編集</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={updateItem.title}
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="アイテム名"
            required
          />
          <input
            value={updateItem.price}
            onChange={handleChange}
            type="text"
            name="price"
            placeholder="価格"
            required
          />
          <input
            value={updateItem.image}
            onChange={handleChange}
            type="text"
            name="image"
            placeholder="画像"
            required
          />
          <textarea
            value={updateItem.description}
            onChange={handleChange}
            type="text"
            name="description"
            rows="15"
            placeholder="商品説明"
            required
          ></textarea>
          <button>編集</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};

export default UpdateItem;
