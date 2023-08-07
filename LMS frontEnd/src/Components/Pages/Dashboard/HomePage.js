import React from 'react'
import "./Dashboard.css"
import { Calendar } from 'antd'

const HomePage = () => {
  return (
    <div className='homePage'>
        <Calendar
         onSelect={(date) =>{
            console.log("selected date", date);
         }}

         dateCellRender = {(date) =>{
            if(new Date(date).getDate() === new Date().getDate() && new Date(date).getMonth() === new Date().getMonth()
             && new Date(date).getFullYear() === new Date().getFullYear()){
                
                    return <h5 style={{textAlign:'center'}}>Today</h5>
                
                
            }
         }}
         ></Calendar>
    </div>

  )
}

export default HomePage