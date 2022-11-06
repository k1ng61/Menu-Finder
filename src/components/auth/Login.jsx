import { signInWithEmailAndPassword } from 'firebase/auth';
import React, {useState} from 'react'
import {auth} from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleLogin = async() => {
        
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch(error){
            console.log(error);
        }
    }

  return (
    <div className='border p-3 bg-light mx-auto'
    style={{maxWidth: 400, marginTop:60 }}
    >
        <h1>Login</h1>
        <div className='form-group'>
            <label>Email</label>
            <input type='email' className='form-control' placeholder='Enter your email' onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        <div className='form-group'>
            <label>Password</label>
            <input type='password' className='form-control' placeholder='Enter your password' onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        <br />
        <button className='btn btn-primary' onClick={handleLogin}>Login</button>
        
    </div>
  )
}