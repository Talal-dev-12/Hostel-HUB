import React from 'react'
import axios from 'axios';

const data = () => {
  return (
   <>
    <div>data page</div>
    <button onClick={async () => {
      try{
    const res = await axios.get("http://localhost:5000/students")
    console.log(res);
  }catch(error){
    console.error("Error fetching data:", error);
    throw error;
  }
    }}>Get Data</button>    
   </>
  )
}

export default data