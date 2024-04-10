import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import {createHashRouter, RouterProvider} from "react-router-dom";
import { Home } from './pages/home/_Home.jsx'
import { NewList } from './pages/new_list/_NewList.jsx'
import { DeleteProduct } from './pages/delete/_DeleteProduct.jsx'
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      }, {
        path: "/product/new",
        element: <NewList />
      }, {
        path: "/product/:id",
        element: <h1>I am on the the list page</h1>
      }
      , {
        path: "/product/edit/:id",
        element: <h1>Edit</h1>
      }
      , {
        path: "/product/delete/:id",
        element: <DeleteProduct />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
