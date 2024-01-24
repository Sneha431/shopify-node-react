import React, { useState ,useRef, useEffect} from 'react';
import { useNavigate ,useParams} from "react-router-dom";
import axios from 'axios';
import { Parser } from 'html-to-react';
import { getproductbyid ,putproducts} from './store/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';


function UpdateProduct() {
 
    const [file,setfile] = useState(null)
   const dispatch = useDispatch();
    const [imageobjdata,setimageobjdata] = useState([])
    let {  singledata,title,position } = useSelector(
    (state) => state.product
  );
    const [imageData, setImageData] = useState(null);
   
    const [title1, settitle1] = useState(title);
    const [position1, setposition1] = useState(position);

   const titleref =useRef();
   const bodyref =useRef();
   var imageprevobj = []
   var imageprevobjbase64 = []
   var imageobj = []
   var fileObj = [];
   var resultobj=[];
   var { id } =useParams();
const navigate = useNavigate();
const [bodyhtml, setbodyhtml] = useState();


  useEffect(() => {
imageprevobj.push(Object.assign({}, {attachment: imageData }));

 
  }, [imageData]);
  useEffect(() => {
   
    
    dispatch(getproductbyid(id))
      }, [id]);

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
      resultobj.push(Object.assign({},imageprevobj[0]["attachment"][i], { filename: imageobjdata[i].filename ,position:position <0?position:position+1}));
      
        }

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
       

console.log(data)
 
dispatch(putproducts(data,id)).then((res) => {
  //  console.log(res)
   //navigate("/");
     })
     .catch((err) => {
    console.log(data)
     });


        
    }

    // const handleTextareaChange = (event) => {
    //   // Update singledata with the new body_html content
    //   setbodyhtml({ ...singledata, body_html: event.target.value });
    // };
  return (
 <>
 <form>
  <fieldset>
 {singledata && <><div className="form-group">
      <label htmlFor="title" className="form-label mt-4">Title</label>
      <input type="text" className="form-control" id="title" name="title"   ref={titleref} onChange={(e) => settitle1(e.target.value)} value={title1} placeholder="title"/>
    </div>
    
    <div className="form-group">
    <label htmlFor="body" className="form-label mt-4">Body</label>
  <textarea id="body" name="body" ref={bodyref} onChange={(e) => setbodyhtml(bodyref.current.value)}
       >{singledata.body_html}</textarea>

 
  <p>{bodyref.current? Parser().parse(bodyref.current.value) : Parser().parse(singledata.body_html)}</p> 


    </div>
   
    <div className="form-group">
    <label htmlFor="body" className="form-label mt-4">Images</label>
    <input type="file" className="form-control" onChange={uploadMultipleFiles} multiple id="imagefile"/>
   
    <button type="button" className="btn btn-danger btn-block" onClick={uploadFiles}>Upload</button>
    </div>
    {singledata.images && 
   
   singledata.images.map((img)=>(
 <img src={img.src} alt="Selected" style={{ maxWidth: '20%' }} />
  
    ))
  }
  {file && 
   
   file.map((img)=>(
 <img src={img} alt="Selected" style={{ maxWidth: '20%' }} />
  
    ))
  }
  </>
  }

   
    

    <button type="submit" className="btn btn-danger btn-block" onClick={submitform}>Submit</button>
</fieldset>
     
</form>
 </>
  )
}

export default UpdateProduct
