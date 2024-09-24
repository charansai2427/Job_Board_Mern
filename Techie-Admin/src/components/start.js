import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Start() {
    const navigate = useNavigate();
    useEffect(() => {
    
      navigate("/admin/login")
    },[])
  return (
    <div className='d-flex justify-content-center align-items-center '>
    
    </div>
  )
}

export default Start
