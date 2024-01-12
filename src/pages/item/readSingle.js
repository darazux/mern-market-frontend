// readSingle.js

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ReadSingle = () => {
  const base_url = process.env.REACT_APP_API_URL;
  const params = useParams();
  const [singleItem, setSingleItem] = useState({
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
        setSingleItem({
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
  return (
    <div>
      <div>
        {singleItem.image && <img src={singleItem.image} alt="singleItem" />}
      </div>
      <div>
        <h1>{singleItem.title}</h1>
        <h2>￥{Number(singleItem.price).toLocaleString()}</h2>
        <hr />
        <p>{singleItem.description}</p>
      </div>
    </div>
  );
};

export default ReadSingle;
