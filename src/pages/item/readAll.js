// readAll.js

import { useEffect, useState } from 'react';

const ReadAll = () => {
  const [allItems, setAllItems] = useState('');
  const base_url = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const getAllItems = async () => {
      try {
        const resp = await fetch(`${base_url}`);
        const jsonResp = await resp.json();
        setAllItems(jsonResp);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, [base_url]);
  return (
    <div>
      {allItems &&
        allItems.allItems.map((item) => (
          <div key={item._id}>
            <img src={item.image} alt="item" />
            <h2>￥{Number(item.price).toLocaleString()}</h2>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
    </div>
  );
};

export default ReadAll;
