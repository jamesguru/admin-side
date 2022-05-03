import React from 'react';

import './gallery.css';

import axios from 'axios';

import {useEffect,useState} from 'react';

import {Link} from 'react-router-dom';







const Gallery = () => {


const [gallery,setGallery] = useState([]);





useEffect(() =>{


    const getGallery = async () =>{



        try {


            const res = await axios.get('http://localhost:4444/api/gallery');



            setGallery(res.data);
            
        } catch (error) {



            console.log(error);
            
        }



    }




    getGallery();


},[])


const handleDelete = async (id) =>{




    try {


        await axios.delete(`http://localhost:4444/api/gallery/${id}`);

        window.location.reload();
        
    } catch (error) {


        console.log('something went wrong');
        
    }

}




    return (
        <div className="container">




        <div className="info">


            <button className="create">
                


                <Link className="link" to="/newgallery">
                
                         Create
                
                </Link>
                
                
                
                
                
                
                </button>




            {gallery.length ? gallery.map((gal) => (

                  

                    <div className="info-gallery">

                        <video src={gal.video} muted
                                    
                                    height='200px'

                                    width='200px'
                                    
                                    
                                    />

                         <h5 className="title">{gal.title}</h5>

                    <button onClick={() => handleDelete(gal._id)} className="delete">Delete</button>

            </div>
                    


)) : <h1 style={{display:'flex', alignItems:'center',justifyContent:'center'}}>Loading...</h1>}


            </div>

          

         </div>
    )
}

export default Gallery;
