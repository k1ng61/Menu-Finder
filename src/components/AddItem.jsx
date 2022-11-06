import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';

import {collection, addDoc} from 'firebase/firestore';

import { db, auth } from '../firebaseConfig';

export default function AddItem() {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    let navigate = useNavigate();

    const handleAdd = () => {
        try {
            const dbref = collection(db, "MenuItems");
            addDoc(dbref, {
                userId: auth.currentUser.uid,
                name: name,
                description: desc,
                price: price,
                imageUrl: image,
            })

            navigate('/');
        } catch(error) {
            console.log(error);
        }
    }

  return (
    <div className='border p-3 bg-light mx-auto'
    style={{maxWidth: 400, marginTop:60 }}
    >
        <h1>Add Item</h1>
        <div className='form-group'>
            <label>Item Name</label>
            <input type='text' className='form-control' placeholder='Enter Item Name' onChange={(e)=>{setName(e.target.value)}}/>
        </div>
        <div className='form-group'>
            <label>Description</label>
            <input type='text' className='form-control' placeholder='Enter Item Description' onChange={(e)=>{setDesc(e.target.value)}}/>
        </div>
        <div className='form-group'>
            <label>Price</label>
            <input type='number' className='form-control' placeholder='Enter Item Price' onChange={(e)=>{setPrice(e.target.value)}}/>
        </div>
        <div className='form-group'>
            <label>Image Url</label>
            <input type='text' className='form-control' placeholder='Enter Item Image Url' onChange={(e)=>{setImage(e.target.value)}}/>
        </div>
        <br />
        <button className='btn btn-primary' onClick={handleAdd}>Add</button>
        
    </div>
  )
}
