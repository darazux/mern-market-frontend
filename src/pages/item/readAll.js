// readAll.js

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
      <div className="grid-container-in">
        {allItems &&
          allItems.allItems.map((item) => (
            <Link to={`/item/${item._id}`} key={item._id} className="card">
              <img src={item.image} alt="item" />
              <div className="texts-area">
                <h2>￥{Number(item.price).toLocaleString()}</h2>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ReadAll;
