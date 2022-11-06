import React, {useState, useEffect} from 'react'
import { collection, onSnapshot, addDoc, query} from "firebase/firestore";
import { db } from '../firebaseConfig';
import {useNavigate} from 'react-router-dom';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
    } from "mdb-react-ui-kit";

export default function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    let navigate = useNavigate();
    useEffect(() => {
        const ref = collection(db, "Cart");
        const q = query(ref);
        onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            
            setCartItems(items);
            
        })
        for (var i = 0; i < cartItems.length; ++i){
            setTotal(cartItems[i].price + total);
        }
        
    }, [])
    
    const sendOrder = () => {
        navigate('/');
    }
  return (
    <div>
        <section className="h-100 h-custom" >
  <MDBContainer className="py-5 h-100">
    <MDBRow className="justify-content-center align-items-center h-100">
      <MDBCol size="12">
        <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
          <MDBCardBody className="p-0">
            <MDBRow className="g-0">
              <MDBCol lg="8">
                <div className="p-5">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                      Shopping Cart
                    </MDBTypography>
                    <MDBTypography className="mb-0 text-muted">
                      {cartItems.length}
                    </MDBTypography>
                  </div>

                  <hr className="my-4" />
                  {
                        cartItems.map((item) => (
                            <>
                            <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                                <MDBCol md="2" lg="2" xl="2">
                                <MDBCardImage
                                    src={item.imageUrl}
                                    fluid className="rounded-3" alt="Cotton T-shirt" />
                                </MDBCol>
                                <MDBCol md="3" lg="3" xl="3">
                                <MDBTypography tag="h6" className="text-muted">
                                   {item.name}
                                </MDBTypography>
                                <MDBTypography tag="h6" className="text-black mb-0">
                                    {item.description}
                                </MDBTypography>
                                </MDBCol>
                                <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                                <MDBBtn color="link" className="px-2">
                                    <MDBIcon fas icon="minus" />
                                </MDBBtn>

                                <MDBInput type="number" min="0" defaultValue={1} size="sm" />

                                <MDBBtn color="link" className="px-2">
                                    <MDBIcon fas icon="plus" />
                                </MDBBtn>
                                </MDBCol>
                                <MDBCol md="3" lg="2" xl="2" className="text-end">
                                <MDBTypography tag="h6" className="mb-0">
                                    $ {item.price}
                                </MDBTypography>
                                </MDBCol>
                                <MDBCol md="1" lg="1" xl="1" className="text-end">
                                <a href="#!" className="text-muted">
                                    <MDBIcon fas icon="times" />
                                </a>
                                </MDBCol>
                            </MDBRow>

                            <hr className="my-4" />

                            </>
                        ))
                    }
                  

                  <div className="pt-5">
                    <MDBTypography tag="h6" className="mb-0">
                      <MDBCardText tag="a" href="#!" className="text-body">
                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                        to shop
                      </MDBCardText>
                    </MDBTypography>
                  </div>
                </div>
              </MDBCol>
              <MDBCol lg="4" className="bg-grey">
                <div className="p-5">
                  <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                    Summary
                  </MDBTypography>

                  <hr className="my-4" />

                  <div className="d-flex justify-content-between mb-4">
                    <MDBTypography tag="h5" className="text-uppercase">
                    Pappadeaux Seafood Kitchen
                    </MDBTypography>
                    
                  </div>

                  <MDBTypography tag="h5" className="text-uppercase mb-3">
                    Schedule
                  </MDBTypography>

                  <div className="mb-4 pb-2">
                    <select className="select p-2 rounded bg-grey" style={{ width: "100%" }}>
                      <option value="1">Now</option>
                      <option value="2">In the next hour</option>
                      <option value="3">2-4 hours</option>
                      
                    </select>
                  </div>

                  <MDBTypography tag="h5" className="text-uppercase mb-3">
                    Table Number:
                  </MDBTypography>

                  <div className="mb-5">
                    <MDBInput size="lg" label="Enter Table #" />
                  </div>

                  <hr className="my-4" />

                  <div className="d-flex justify-content-between mb-5">
                    <MDBTypography tag="h5" className="text-uppercase">
                      Total price
                    </MDBTypography>
                    <MDBTypography tag="h5">$ {total}</MDBTypography>
                  </div>

                  <button type="button" class="btn btn-primary " onClick={sendOrder}>Send Order</button>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</section>
    </div>
  )
}
