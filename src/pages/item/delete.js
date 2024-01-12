// delete.js

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
        });
      } catch (error) {
        console.log(error);
      }
    };
    getSingleItem();
  }, [params.id]);
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
};

export default DeleteItem;
