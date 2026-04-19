import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './componets/Home/Home.jsx'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './layout.jsx'
import About from './componets/About/About.jsx'
import Contact from './componets/Contact/Contact.jsx'
import User from './componets/User/User.jsx'
import Github, { account_info_loader } from './componets/Github/Github.jsx'

// const router=createBrowserRouter([
//   {
//     path:'/',
//     element:<Layout />,
//     children:[
//       {
//         path:'/',
//         element:<Home />
      
//       },
//       {
//         path:'about',
//         element:<About />
//       },
//       {
//         path:'contact',
//         element:<Contact />
//       }
//       ]
      
    
//   }
// ])
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route path='/' element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
    <Route path='/user/:id' element={<User />} />
    <Route 
    loader={account_info_loader}
     path='github' element={<Github />} />
  </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
