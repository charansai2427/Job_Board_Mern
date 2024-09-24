import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdminLogin from '../src/components/admin/adminLogin';
import DashBoard from '../src/components/admin/dashBoard';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileForm from './components/profileForm';
import UploadPic from './components/uploadPic';
import Start from './components/start';
import Animation from './components/animation';
import Register from './components/register';



function App() {
   const router = createBrowserRouter([
   {
    path:"/",
    element: <Start/>
   },
   {
    path: "/animation",
    element: <Animation/>
   },
 
   {
     path: "/profile/edit/:userId",
     element: <ProfileForm/>
   },

      {
        path:"/admin/login",
        element:<AdminLogin/>
      },

      {
        path:"/admin/register",
        element:<Register/>
      },
      {
        path: "/admin/dashboard",
        element: <DashBoard/>
      },
      {
        path: "/profile/edit-pic",
        element: <UploadPic/>
      }
     
   ])
  return (
    <div className="App">
             <RouterProvider router={router}/>
    </div>
  );
}

export default App;