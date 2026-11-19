import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Homepage from './Pages/Hompage.jsx'
import Rewatchpage from './Pages/Rewatch.jsx'
import Bookingpage from './Pages/Bookings.jsx'


const router = createBrowserRouter([
  {
    path : '/' , 
    element : <Layout></Layout> ,
    children : [{
      index : true , element : <Homepage></Homepage>
    }
     ,
    {
      path : '/Rewatch' , element : <Rewatchpage></Rewatchpage>
    } , {
      path : '/Booking' , element : <Bookingpage></Bookingpage>
    }]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router ={router}></RouterProvider>
  </StrictMode>,
)
