import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import {createHashRouter, RouterProvider} from "react-router-dom";
import { Home } from './pages/home/_Home.jsx'
import { NewList } from './pages/new_list/_NewList.jsx'
import { DeleteProduct } from './pages/delete/_DeleteProduct.jsx'
import { EditProduct } from './pages/edit/_EditProduct.jsx'
import { ViewProduct } from './pages/view/_ViewProduct.jsx'
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
        element: <ViewProduct />
      }
      , {
        path: "/product/edit/:id",
        element: <EditProduct />
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
