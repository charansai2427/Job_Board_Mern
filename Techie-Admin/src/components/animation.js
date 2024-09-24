import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Animation() {
    const navigate = useNavigate()
    useEffect(() => {
           setTimeout(() => {
            navigate("admin/dashboard")
           },5000)
    },[])
  return (
    <div style={{width: "100vw", height: "100vh"}} className='d-flex justify-content-center align-items'>
        <div>
            <img src='https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp'/>
        </div>
    </div>
  )
}

export default Animation
