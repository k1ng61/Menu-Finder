import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Rnavbar from './components/Rnavbar';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import {useEffect, useState} from 'react';
import { collection, onSnapshot, orderBy, query} from "firebase/firestore";
import { db } from './firebaseConfig';
import Profilepage from './components/Profilepage';
import Frontpage from './components/Frontpage';
import ShoppingCart from './components/ShoppingCart';
import AddItem from './components/AddItem';

function App() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const userref = collection(db, "Restaurants");
    const q = query(userref);
    onSnapshot(q, (snapshot)=>{
      const names = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRestaurants(names);
    })
    
  }, [])

  
  return (
    <div className='app'>
      <Router>
        <Rnavbar />
        
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/' element={<Frontpage />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/cart' element={<ShoppingCart />}/>
          <Route path='/additem' element={<AddItem />}/>

          {restaurants?.length === 0 ? (
            <></>
          ) :(
            restaurants.map((restaurant) => (
              
              <Route path={`/${restaurant.name.replace(/\s/g, '')}`} element={<Profilepage restaurant={restaurant}/>}/>
            ))
          )
          }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
