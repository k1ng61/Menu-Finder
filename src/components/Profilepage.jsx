import React, {useState, useEffect} from 'react'
import { collection, onSnapshot, addDoc, query} from "firebase/firestore";
import { db } from '../firebaseConfig';
import Card from 'react-bootstrap/Card';


export default function Profilepage({restaurant}) {
    const [menuItems, setmenuItems] = useState([]);
    useEffect(() => {
        const ref = collection(db, "MenuItems");
        const q = query(ref);
        onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setmenuItems(items);
        })
    }, [])


    const addToCart = (item) =>{
        try{
            const dbref = collection(db, "Cart");
            addDoc(dbref, {
                name: item.name,
                description: item.description,
                price: item.price,
                imageUrl: item.imageUrl,
            })
        } catch(error) {
            console.log(error)
        }
    }
  return (
    <div className="container">

        <Card className='bg-dark text-white collection profile-card'>
            <Card.Img variant='bottom' className='collection-image profile-image' src={restaurant.imageUrl} />
            <Card.ImgOverlay>
                <Card.Title className='profile-title'>{restaurant.name}</Card.Title>
                <Card.Text className='profile-title'>
                Rating: {restaurant.rating}
                </Card.Text>
                <Card.Text className='profile-title'>
                Price: {restaurant.price}
                </Card.Text>
                <Card.Text className='profile-title'>
                Address: {restaurant.address[0]}, {restaurant.address[1]}
                </Card.Text>
                
            </Card.ImgOverlay>
        </Card>
        <div className="menu-container">
            {menuItems.map(item => (item?.userId === restaurant?.userId) && (
                <>
                <Card className='menu-item'>
                    <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text>${item.price}</Card.Text>
                    <Card.Text><button type="button" class="btn btn-primary" onClick={event => addToCart(item)} >Add to Cart</button></Card.Text>
                    
                    </Card.Body>
                    <Card.Img variant='bottom' className='item-image' src={item.imageUrl} />
                </Card>
                </>
            ))}
            
        </div>
    </div>
  )
}
