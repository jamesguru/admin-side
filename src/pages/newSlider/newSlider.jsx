import {React,useEffect,useState} from 'react';
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import app from '../../firebasestore';

import './newSlider.css';
import axios from 'axios';

const NewSlider = () => {


        const [title,setTitle] = useState('');

        
        const [desc, setDesc] = useState('');

        const [file,setFile] = useState(null);

        const [percentage,setpercentage] = useState(0);



      console.log(desc)

        const uploadSlider = async(slider) => {


            try {


                await axios.post('http://localhost:4444/api/slider/', slider);


                window.location.reload();

                
                
            } catch (error) {


                console.log(error);



                
            }
        }


        const handleUpload = (e) => {

            e.preventDefault();


            const filename = new Date().getTime() + file.name;
      
            const storage = getStorage(app);
          
            const StorageRef = ref(storage, filename);
          
            const uploadTask = uploadBytesResumable(StorageRef,file);
    
            
          
            
          
          
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
    
    
               
    
    
                const newSlider = {"img":downloadURL,"title":title,"desc":desc};
    
    
                 title && desc &&  uploadSlider(newSlider);
    
    
    
                
              });
            }
          );
          
          
    
    
    
    


        }



    return (
        <div className="container">


            <div className="info">


                <h3>New Slider</h3>


                <input type="file" className="input-title" onChange={(e) => setFile(e.target.files[0])}/>
                <h4 style={{color:'green'}}>{`File upload is ${percentage} %`}</h4>

                <input type="text" className="input-title" placeholder="Write title" onChange={(e) => setTitle(e.target.value)}/>

               


                <input type="text" className="input-desc"  placeholder="Write small description" onChange={(e) => setDesc(e.target.value)}/>

                


                <button  onClick={handleUpload} className="button-upload">Upload</button>



            </div>
            
        </div>
    )
}

export default NewSlider;
