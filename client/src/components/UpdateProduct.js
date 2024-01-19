import React, { useState ,useRef} from 'react';
import axios from 'axios';
function UpdateProduct() {

    const [file,setfile] = useState(null)
    const [filename,setfilename] = useState(null)
    const [imageData, setImageData] = useState('');
   const titleref =useRef();
   const bodyref =useRef();
   const uploadMultipleFiles = (e)=> {
   let fileObj = [];
//   let  fileArray = [];
//         fileObj.push(e.target.files);
//         for (let i = 0; i < fileObj[0].length; i++) {
//             fileArray.push(URL.createObjectURL(fileObj[0][i]))
//         }
//     


const selectedFile = e.target.files[0];
if (selectedFile) {
  const reader = new FileReader();

  reader.onloadend = () => {
    const base64Data = reader.result.split(',')[1];
    console.log(reader);
    setImageData(base64Data);
  };

  reader.readAsDataURL(selectedFile);
  setfile(selectedFile);
  setfilename(e.target.files[0].name)
  console.log(imageData);
}
   }
    const  uploadFiles= (e)=> {
        e.preventDefault()
        // // setfilename(e.target.files[0].name)
        // // setfile(e.target.files[0])
        // const result = Object.values(file);

        console.log(filename);
        
    }
   
    const submitform = async(e) =>{

        e.preventDefault();
        const title= titleref.current.value;
        const body_html= bodyref.current.value;
      

        const data = {
            "product":{
            title:title,body_html:body_html,
            "images": [
                {
                  "attachment": imageData,
                  "filename": filename,
              
                
                }
              ]
             }
            
        }
        
      
          // Send chunk to the server
          await axios({
            method: 'post',
            url: 'http://localhost:5000/api/postProducts',
       headers: {'Content-Type' : 'application/json'},
            data: JSON.stringify(data)
        })
          
             .then((data) => {
                console.log(data);
                // Handle data
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
    {file && <img src={URL.createObjectURL(file)} alt="Selected" style={{ maxWidth: '20%' }} />}
    <button type="submit" className="btn btn-danger btn-block" onClick={submitform}>Submit</button>
</fieldset>
     
</form>
 </>
  )
}

export default UpdateProduct
