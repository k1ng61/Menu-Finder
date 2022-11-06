import React, {useState} from 'react'
import { geolocated } from "react-geolocated";
import {useEffect} from 'react';
import { collection, onSnapshot, orderBy, query} from "firebase/firestore";
import { db } from '../firebaseConfig';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export default function Frontpage() {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    var distances = [];
    var index = 0;
    

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

    const findres = () => {
        if (!navigator.geolocation) {
            
            <>
            <p>Not supported</p>
            </>
        } else{
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            })
            for (var i = 0; i < restaurants.length; i++) {
                var reslat = restaurants[i].coordinates.latitude;
                var reslong = restaurants[i].coordinates.longitude;

                var lon1 =  long * Math.PI / 180;
                var lon2 = reslong * Math.PI / 180;
                var lat1 = lat * Math.PI / 180;
                var lat2 = reslat * Math.PI / 180;
                
                
                let a = Math.pow(Math.sin((lat2 - lat1) / 2), 2)
                        + Math.cos(lat1) * Math.cos(lat2)
                        * Math.pow(Math.sin((lat2 - lat1) / 2),2);
                    
                let c = 2 * Math.asin(Math.sqrt(a));
                let r = 6371;

                var distance = c *r;
                distances.push(distance);
            }

            
            var value = distances[0];

            for (var i = 1; i < distance.length; i++){
                if (distances[i] < value){
                    value = distances[i];
                    index = i;
                }
            }

            
        }
        
    }

  return (
    <div className='mains'>
        <div className="container front-container">
        <div>
        <h1>Find a Registered Restaurant near you</h1>
        <br />
        <button type="button" class="btn btn-primary fbutton" onClick={findres}>Find</button>
        </div>
        
        
    </div>
    <div>
    {
            lat? (
                <>
                <div className="menu-container">
                <Link to={`/${restaurants[index].name.replace(/\s/g, '')}`}> 
                    <Card className='menu-item'>
                            <Card.Body>
                            <Card.Title>{restaurants[index].name}</Card.Title>
                            <Card.Text>{restaurants[index].rating}&#9733;</Card.Text>
                            
                            </Card.Body>
                            <Card.Img variant='bottom' className='item-image' src={restaurants[index].imageUrl} />
                        </Card>
                    </Link>
                </div>
                </>
            ) : (
                <>
                <div className="menu-container">
                    {restaurants.map(restaurant => (
                        <>
                        <Link to={`/${restaurant.name.replace(/\s/g, '')}`}>
                            <Card className='menu-item'>
                                <Card.Body>
                                <Card.Title>{restaurant.name}</Card.Title>
                                <Card.Text>{restaurant.rating}&#9733;</Card.Text>
                                
                                </Card.Body>
                                <Card.Img variant='bottom' className='item-image' src={restaurant.imageUrl} />
                            </Card>
                        </Link>
                        
                        </>
                    ))}
                </div>
                </>
            )
        }
    </div>
    </div>
    
  )
}
