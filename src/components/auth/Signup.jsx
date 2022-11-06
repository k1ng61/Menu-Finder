import React, {useState} from 'react'
import { auth } from '../../firebaseConfig';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {useNavigate} from 'react-router-dom';
import { db } from '../../firebaseConfig';
import {collection, addDoc} from 'firebase/firestore';
import * as XLSX from 'xlsx';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [file, setFile] = useState('');
    

    let navigate = useNavigate();
    
   

    const handleSignup = async() => {
        
        const response = await fetch(`https://yelp-backend.netlify.app/.netlify/functions/search?location=${location}&term=${name}`);
        const data = await response.json();
        const restaurant = data.businesses[0];

        try {
            
            await createUserWithEmailAndPassword(auth, email, password);
            updateProfile(auth.currentUser, {displayName: name});
            
            const dbref = collection(db, "Restaurants");
            addDoc(dbref, {
                userId: auth.currentUser.uid,
                name: name,
                imageUrl: restaurant.image_url,
                rating: restaurant.rating,
                phone: restaurant.phone,
                address: restaurant.location.display_address,
                price: restaurant.price,
                coordinates: restaurant.coordinates,
            })

            navigate('/');

        } catch(error) {
            console.log(error)
        }

        

        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            const lenstr = ws['!ref'];
            const length = lenstr.charAt(lenstr.length - 1)
            
            for (var i  = 1; i < length; i++){
                const name = ws[`A${i+1}`].v;
                const desc = ws[`B${i+1}`].v;
                const price = ws[`C${i+1}`].v;
                const image = ws[`D${i+1}`].v;

                try{
                    const dbref = collection(db, "MenuItems");
                    addDoc(dbref, {
                        userId: auth.currentUser.uid,
                        name: name,
                        description: desc,
                        price: price,
                        imageUrl: image,
                    })
                } catch(error) {
                    console.log(error)
                }

                
            }
            
            
          };
          reader.readAsBinaryString(file);
    
          

    }

  return (
    <div>
        <div className="container">
        <div className='border p-3 bg-light' style={{marginTop: 70}}>
        <h1>Register Restaurant</h1>
        <div className='form-group'>
            <label>Email</label>
            <input type='email' className='form-control' placeholder='Enter your email' onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        <div className='form-group'>
            <label>Restaurant Name</label>
            <input type='text' className='form-control' placeholder='Enter Restaurant Name' onChange={(e)=>{setName(e.target.value)}}/>
        </div>
        <div className='form-group'>
            <label>Restaurant Address</label>
            <input type='text' className='form-control' placeholder='Enter Restaurant Address' onChange={(e)=>{setLocation(e.target.value)}}/>
        </div>
        <div className="form-group">
            <label>Menu file</label>
            <input className='form-control' type='file' onChange={(e) => setFile(e.target.files[0])}/>
        </div>
        <div className='form-group'>
            <label>Password</label>
            <input type='password' className='form-control' placeholder='Enter your password' onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        
        <br />
        <button className='btn btn-primary' onClick={handleSignup}>Register</button>
    </div>
    </div>
    </div>
    
    
  )
}
