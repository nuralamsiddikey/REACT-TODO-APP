import React, { useState,createContext } from 'react';
import styles from './style/app.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResponsiveDialog from './components/UpdatedModal';
import { v4 as uuidv4 } from 'uuid';
export const  textContext = createContext()

export const App = () => {
   const [inputText, setInputText] = useState('')
   const [text,setText] = useState([])

   const textHandle = ()=>{
        if(inputText ===""){
           toast.warn("required field text!",{
               hideProgressBar: true,
               position: "top-center",
               theme: "dark",

           });
        }
        else{
           setText((existingText)=>[...existingText, {id: uuidv4(), text: inputText}])
           setInputText('')
        }
   }



   const deleteText = (id)=>{
       const index = text.findIndex(data=>data.id === id)
       const newText = text.slice(0, index).concat(text.slice(index+1,text.length+1))
       setText(newText)
   }

  return (
    <textContext.Provider value={{text,setText}}>
        <div className={styles.wrapper}>
          <div className={styles.head}>
             
              <TextField
                  style={{width:'300px'}}
                  value={inputText}
                  id="filled-size-small"               
                  variant="filled"
                  size="small"
                  placeholder='text'
                  onChange={(e)=>setInputText(e.target.value)}
            />
                    <Button 
                      style={{height:'38px'}}
                      onClick={textHandle}
                      variant="contained">
                      Add
                    </Button>

          </div>
          <div className={styles.body}>
                 {text.map((data, index)=>(
                     <div key={index} className={styles.text}>
                         <h1>{data.text}</h1>
                      
                         <div className={styles.button}>

                             <ResponsiveDialog id={data.id}/>
                              <Button 
                                  onClick={()=>deleteText(data.id)}
                                  variant="outlined">
                                DELETE
                              </Button>

                         </div>
                     </div>
                 ))}
          </div>
        </div>
        <ToastContainer/>
    </textContext.Provider>
  );
};

