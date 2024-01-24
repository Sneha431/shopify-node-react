import React, { useState ,useRef, useEffect,} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { postproducts } from './store/ProductSlice';
function PostProduct() {

    const [file,setfile] = useState(null)
   
    const [imageobjdata,setimageobjdata] = useState([])
   
    const [imageData, setImageData] = useState(null);
    const dispatch=useDispatch();
   const titleref =useRef();
   const bodyref =useRef();
   var imageprevobj = []
   var imageprevobjbase64 = []
   var imageobj = []
   var fileObj = [];
   var resultobj=[];
const navigate = useNavigate();
  useEffect(() => {
imageprevobj.push(Object.assign({}, {attachment: imageData }));

  }, [imageData]);
   const uploadMultipleFiles = async(e)=> {
   
  let  fileArray = [];
        fileObj.push(e.target.files);
      
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]))
            setfile(fileArray);
        }
        console.log(fileArray);
for (let i = 0; i < fileObj[0].length; i++) {

    const reader = new FileReader();
 
 reader.onloadend = (e) => {
      const base64Data = e.target.result.split(',')[1];
   
    imageprevobjbase64.push({attachment:base64Data})
      setImageData(imageprevobjbase64);
   
    };



    reader.readAsDataURL(fileObj[0][i]);
    // imageobj.push({filename:fileObj[0][i].name})
    imageobj.push(Object.assign({}, {filename:fileObj[0][i].name}));
    setimageobjdata(imageobj);

 // setfile(fileObj[0][i]);


}

}

 const  uploadFiles= (e)=> {
        e.preventDefault();
    for (let i = 0; i < imageobjdata.length; i++) {
      resultobj.push(Object.assign({},imageprevobj[0]["attachment"][i], { filename: imageobjdata[i].filename }));

        }
      console.log(resultobj)
    }
  
    const submitform = async(e) =>{
   
        e.preventDefault();
        const title= titleref.current.value;
        const body_html= bodyref.current.value;
      

        const data = {
            "product":{
            title:title,body_html:body_html,
            "images":resultobj
             }
            
        }
        
 console.log(data);

 dispatch(postproducts(data)).then((data) => {
              navigate("/");
             })
             .catch((err) => {
                console.log(err);
             });
      
        

        
    }
  return (
 <>
 <form>
  <fieldset>
   
    <div className="form-group">
      <label htmlFor="title" className="form-label mt-4">Title</label>
      <input type="text" className="form-control" id="title" name="title" ref={titleref} placeholder="title" autoComplete="off"/>
    </div>
    
    <div className="form-group">
    <label htmlFor="body" className="form-label mt-4">Body</label>
  <textarea id="body" name="body" ref={bodyref}></textarea>
    </div>
   
    <div className="form-group">
    <label htmlFor="body" className="form-label mt-4">Images</label>
    <input type="file" className="form-control" onChange={uploadMultipleFiles} multiple id="imagefile"/>
    {/* <FileBase
        type="file"
        multiple={true}
        onDone={(base64 ) =>
        setfile({file: base64 })
        
      }
    //   onChange={uploadMultipleFiles}
        
      /> */}
    <button type="button" className="btn btn-danger btn-block" onClick={uploadFiles}>Upload</button>
    </div>
    {file && 
   
   file.map((img)=>(
 <img src={img} alt="Selected" style={{ maxWidth: '20%' }} />
  
    ))
  }
    <button type="submit" className="btn btn-danger btn-block" onClick={submitform}>Submit</button>
</fieldset>
     
</form>
 </>
  )
}

export default PostProduct
