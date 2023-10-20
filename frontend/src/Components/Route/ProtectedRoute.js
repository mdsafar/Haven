import React from "react"
import {  Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const ProtectedRoute = ({element : Element})=>{
   const {isAuthenticated, user} = useSelector((state)=> state.user)
   
  if(!isAuthenticated){
     return <Navigate to={'/NotFound'}/>
  }

   if (user && user.role !== "admin") {
      return <Navigate to={'/NotFound'}/>
   }

   return Element
}



export default ProtectedRoute;