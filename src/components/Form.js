import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {BASE_URL_PROD} from '../components/shared/Constants'
function Form() {

    const [formObject,setFormObject] = useState({
        "file":""
    })
    
    const handleSubmit = (e)=>{
        e.preventDefault()

        let formData = new FormData()

        formData.append("file",formObject.file)
  

         axios.post(`${BASE_URL_PROD}/test/upload_image`,formData)
         .then((response)=>{
             console.log(response.data)
         })
         .catch((err)=>{
             console.log(err)
         })

    }
  
    const handleChange = (e,type)=>{
        switch (type) {
            case "file":
                setFormObject({...formObject,file : e.target.files[0]})
                break;
            default:
                break;
        }
    }

    useEffect(() => {

        console.log("formObject",formObject)
    }, [formObject])
    
  return (
    <form encType='multipart/form-data' onSubmit={(e)=>{handleSubmit(e)}}>
        <input type='file' name="file" onChange={(e)=>{handleChange(e,"file")}}></input>
        <button >Submit</button>
    </form>
  )
}

export default Form