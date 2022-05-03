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

    const [percentage,setpercentage] = useState(0);


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


    const uploadPromo = async (newPromo) =>{


        try {


            await axios.post('http://localhost:4444/api/promotion/',newPromo);
            
        } catch (error) {


            console.log('something went wrong');
            
        }
    }


    const handleUpload = (e) =>{


        e.preventDefault();

        const filename = new Date().getTime() + file.name;
      
        const storage = getStorage(app);
      
        const StorageRef = ref(storage, filename);
      
        const uploadTask = uploadBytesResumable(StorageRef,file);

        console.log(filename);

        console.log(title);
        console.log(desc);
      
        
      
      
        uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      
          setpercentage(progress);
          console.log('Upload is ' + percentage + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
      
            default:
      
              break;
          }
        }, 
        (error) => {
          // Handle unsuccessful uploads
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {


            console.log(downloadURL);


            const newPromo = {"title" : title, "desc" : desc, "image":downloadURL};


            


            uploadPromo(newPromo);



            
          });
        }
      );
      
      


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

                 <h4 style={{color:'green'}}>{`File upload is ${percentage} %`}</h4>


                 <input className="title-input" type="text" onChange={(e) => setTitle(e.target.value.split(","))} placeholder="write the promo title"/>

                 <textarea  cols="40" rows="5" style={{margin:"20px"}} onChange={(e) => setDesc(e.target.value)} placeholder="description"></textarea>

                 <button className="upload-button" onClick={handleUpload} >upload new</button>



             </div>
            
        </div>
    )
}

export default Promo;
