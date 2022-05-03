import React from 'react';

import './orders.css';

import axios from 'axios';

import {useEffect,useState} from 'react';

import {format} from 'timeago.js';






const Orders = () => {



  const [orders, setOrders] = useState([]);


  useEffect(() => {


    const getOrders = async () =>{



        try {


            const res = await axios.get('http://localhost:4444/api/orders/');


            setOrders(res.data);
            
        } catch (error) {


            console.log('something went wrong');
            
        }
    }


    getOrders();

    
      
  }, [])



  const handleDelete = async (id) =>{


        try {

            await axios.delete(`http://localhost:4444/api/orders/${id}`);

            window.location.reload()
            
        } catch (error) {



            console.log("deleted successfully");


        }



  }

  const handleUpdate = async (id,status) =>{


    try {

        await axios.put(`http://localhost:4444/api/orders/${id}`,{status: status + 1});

        window.location.reload();
        
    } catch (error) {



        console.log("update went wrong");


    }




   


}




const handleStatus = (status) => {

if(status === 0){


    return 'pending';

}else if(status === 1){


    return 'confirmed';

}else if(status === 2){


    return 'Delivered';
}else{

    return 'Reviewed';
}

}

    
  console.log(orders);


    return (
        <div className="tableContainer">


            <div>


            <table>
                

                <tr>
                
                    <th>Name</th>

                    <th>Phone</th>

                    <th>Location</th>

                    <th>Total</th>

                    <th>Time</th>

                    <th>Status</th>

                    <th>Product quantity</th>

                    <th>Product Details</th>

                    <th>Delete</th>

                    <th>Confirm</th>


                    

                    


                    

                    

                    

                    
                </tr>



                {

                    orders.map((order) => (




                        <tr>


                        
                            
                            
                       


                        <td>{order.name}</td>
    
                        <td>+{order.phone}</td>
                        <td>{order.address}</td>
    
                        <td> ksh {order.total}</td>

                        <td>{format(order.createdAt)}</td>

                        


                       <td><button disabled className={order.status === 0 ? 'pending' : 'confirmed'}>{handleStatus(order.status)}</button></td>




                        <td>{order.products.length}</td>

                        <div className="product">


                        
                        {order.products.map((product) => (

                            <>


                            <td><strong>Product Image:</strong> <img src={product.img} alt="" height="100px" width="100px"/></td>
                                
                            <td><strong>Product Name:</strong> {product.title}</td>

                            <td><strong>Product ID:</strong>{product._id}</td>

                            

                            

                           

                            </>

                        ))}


                    </div>

                    <hr style={{height:'5px', color:'teal'}}/>



                    <td><button onClick={() => handleDelete(order._id)} style={{backgroundColor:'red', color:'white', cursor:'pointer',border:'none'}}>Delete</button></td>
                    <td>


                        {

                            order.status < 2 ? <button onClick={() => handleUpdate(order._id, order.status)} style={{backgroundColor:'teal', color:'white', cursor:'pointer',border:'none'}}>next</button> : 'Delivered'



                        }
                        
                        
                        
                    </td>



                    
                        
                    </tr>
                    
                   
    
                   


                    ))
                }

               



            </table>




            </div>


            

            
            
        </div>
    )
}

export default Orders
