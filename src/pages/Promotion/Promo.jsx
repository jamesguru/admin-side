import React from 'react';
import './Promo.css';
import axios from 'axios';

import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import app from '../../firebasestore';


import {useEffect,useState} from 'react';

const Promo = () => {


    const [promo, setPromo] = useState([]);

    const [file,setFile] = useState(null);

    const [title, setTitle] = useState([]);

    const [desc, setDesc] = useState('');

    const [uploading,setUploading] = useState("uploading is 0%");


    useEffect(() =>{




       


        const getPromo = async () =>{


            try {


                const res = await axios.get('http://localhost:4444/api/promotion/');

                setPromo(res.data);
                
            } catch (error) {
                
            }


        }



        getPromo();


    },[])



    const handleDelete = async (id) => {


        try {


            await axios.delete(`http://localhost:4444/api/promotion/${id}`);

            console.log('deleted successfully');

            window.location.reload();
            
        } catch (error) {


            console.log(error);
            
        }


    }



    const handleUpload = async(e) => {


      e.preventDefault();
    
      const data = new FormData();
    
      data.append("file",file);
      data.append("upload_preset", "uploads");
    
    
      setUploading("uploading");
    
      try {
    
    
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dap91fhxh/image/upload",data);
    
        const {url} = uploadRes.data;
    
       

        const newPromo = {"title" : title, "desc" : desc, "image":url};

        uploadPromo(newPromo)
    
        setUploading("uploaded 100%");
        
      } catch (error) {
    
    
        console.log(error);
    
    
        setUploading("uploading failed");
        
      }
    
    
    
    }
    


    const uploadPromo = async (newPromo) =>{


        try {


            await axios.post('http://localhost:4444/api/promotion/',newPromo);


            window.location.reload();
            
        } catch (error) {


            console.log('something went wrong');
            
        }


    }


    





    return (
        <div className="promo">

             <h2 className="title-promo"> Current Promotion</h2>




             {promo.length && promo.map((singlePromo) => (

                <div className="promo-container">


                <img src={singlePromo.image} alt="" height="200px" width ="200px"/>

                 <span className="desc">{singlePromo.title[0] , singlePromo.title[1]}...</span>

                <button onClick = {() => handleDelete(singlePromo._id)} className="button">Delete</button>


                </div>




             ))}


             

             <hr />



             <h2 className="title-promo"> Create New Promotion</h2>


             <div className="create-promo">


                 <input type="file"  onChange ={(e) => setFile(e.target.files[0])}/>

             <h4 style={{color:'green'}}>{uploading}</h4>


                 <input className="title-input" type="text" onChange={(e) => setTitle(e.target.value.split(","))} placeholder="write the promo title"/>

                 <textarea  cols="40" rows="5" style={{margin:"20px"}} onChange={(e) => setDesc(e.target.value)} placeholder="description"></textarea>

                 <button className="upload-button" onClick={handleUpload} >upload new</button>



             </div>
            
        </div>
    )
}

export default Promo;
