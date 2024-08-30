import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Home from './components/Home'

const appRoute = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signUp',
    element: <SignUp />
  },
])


function App() {

  return (
    <>
      <RouterProvider router={appRoute}>

      </RouterProvider>
    </>
  )
}

export default App
