import "./newProduct.css";

import {useState} from 'react'

import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage';

import {useDispatch} from 'react-redux';
import app from '../../firebasestore';
import { addProduct } from "../../redux/apiCalls";

export default function NewProduct() {



  const [inputs, setInputs] = useState({});

  const [file, setFile] = useState(null);

  const [cat, setCat] = useState([]);

  const [color, setColor] = useState([]);

  const [size, setSize] = useState([]);

  const [percentage, setpercentage] = useState(0);

  const dispatch = useDispatch();


  
const handleChange = (e) => {

  setInputs(prev => {


    return {...prev, [e.target.name] : e.target.value}
  })
}

console.log(inputs);

const handleCat = (e) => {

  setCat(e.target.value.split(","));
}

const handleColor = (e) => {

  setColor(e.target.value.split(","));
}

const handleSize = (e) => {

  setSize(e.target.value.split(","));
}


const handleClick =(e) => {

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
    console.log('Upload is ' + progress + '% done');
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
      const product = {...inputs, img:downloadURL,categories: cat, color:color, size: size};


      addProduct(product,dispatch);
    });
  }
);

}



  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>

          <h3 style={{color:'green'}}>{`File upload is ${percentage} %`}</h3>
        </div>

        <div className="addProductItem">
          <label>Video</label>
          <input type="file" id="file" />

          <h3 style={{color:'teal'}}>{`File upload is ${percentage} %`}</h3>
        </div>
        <div className="addProductItem">
          <label>Title </label>
          <input type="text" name ="title" placeholder="Apple Airpods" onChange={handleChange}/>
        </div>

        <div className="addProductItem">
          <label>Description </label>
          <textarea  name ="desc" cols="40" rows="5" onChange={handleChange} placeholder="description"></textarea>
        </div>

        <div className="addProductItem">
          <label>originalPrice </label>
          <input name ="originalPrice" type="number" placeholder="original price" onChange={handleChange}/>
        </div>

        <div className="addProductItem">
          <label>discountedPrice </label>
          <input name ="discountedPrice" type="number" placeholder="discounted price" onChange={handleChange}/>
        </div>


        <div className="addProductItem">
          <label>Brand </label>
          <input type="text" name ="brand" placeholder="Kylie" onChange={handleChange}/>
        </div>

        <div className="addProductItem">
          <label>Category </label>
          <input name ="category" type="text" placeholder="jeans,pajamas" onChange={handleCat}/>
        </div>

        <div className="addProductItem">
          <label>Color </label>
          <input name ="color" type="text" placeholder="white,green,blue" onChange={handleColor}/>
        </div>

        <div className="addProductItem">
          <label>Size </label>
          <input name ="size" type="text" placeholder="XL, S, M" onChange={handleSize}/>
        </div>


        <div className="addProductItem">
          <label>Instock</label>
          <select name="inStock" onChange={handleChange}>


            <option value="true">Yes</option>
            <option value = "false">No</option>
          </select>

          
        </div>
        
        <button onClick={handleClick} className="addProductButton">Create</button>
      </form>
    </div>
  );
}
