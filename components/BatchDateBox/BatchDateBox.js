import React from 'react'
import style from './BatchDateBox.module.css'
import {MdDeleteForever} from 'react-icons/md'

const BatchDateBox = ({PassBatchData}) => {

  const handler = async (id) =>{
   
      const data = await fetch("/api/v1/generateBatchDate", {
      method: "DELETE",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
  }
  return (
    <div className={style.wrapper}>
       <h2>Batch Details</h2>
       <div className={style.wrapperDiv}>
        {PassBatchData.map((data, i) => {
         
          return (
          <div className={style.wrapperContent} key={i}>
            
            
           <h3>ID: {data.id}</h3>
           {data.batchDetails.map((dataS,i)=>{
          
            return (
              <div className={style.innerBox} key={i}>
                <MdDeleteForever  className={style.delIcon} onClick={()=>handler(dataS)}/>
                <p>ID: {dataS.batchId}</p>
              <p>BatchDate: {dataS.batchDate}</p>
           <p>BatchTime: {dataS.batchStartTime} to {dataS.batchEndTime}</p>
      </div>
            )
           })}
           
           </div>)
        })}
       
       </div>
    </div>
  )
}

export default BatchDateBox