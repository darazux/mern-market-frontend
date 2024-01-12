// delete.js

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../utils/useAuth';

const DeleteItem = () => {
  const base_url = process.env.REACT_APP_API_URL;
  const params = useParams();
  const [deleteItem, setDeleteItem] = useState({
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
        setDeleteItem({
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
  }, [params.id, base_url]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch(`${base_url}item/delete/${params.id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const jsonData = await resp.json();
      alert(jsonData.message);
    } catch (error) {
      console.log(error);
      alert('アイテム削除失敗');
    }
  };
  const loginUser = useAuth();
  if (loginUser === deleteItem.email) {
    return (
      <div>
        <h1>アイテム削除</h1>
        <form onSubmit={handleSubmit}>
          <h2>{deleteItem.title}</h2>
          {deleteItem.image && <img src={deleteItem.image} alt="item" />}
          <h3>￥{Number(deleteItem.price).toLocaleString()}</h3>
          <p>{deleteItem.description}</p>
          <button>削除</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};

export default DeleteItem;
