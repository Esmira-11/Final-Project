// import React, { useContext } from 'react'
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom'

// function ProtectedRoute({children}) {
//     let navigate = useNavigate();

//     const {loggedIn} = useContext(AuthContext)

//   return (
//     <>
//         {loggedIn ? children : navigate('/login') }
//     </>
//   )
// }

// export default ProtectedRoute