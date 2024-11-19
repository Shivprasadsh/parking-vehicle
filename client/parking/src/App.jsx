import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SummaryParking from './compents/hero/summary/Summary';
import Home from './compents/Home';
import Navbar from './compents/navbar/Navbar';
import EditForm from './compents/editform/Editform';

const router = createBrowserRouter(
  [
    {
      path: "/summary",
      element: <SummaryParking />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/edit/:id",
      element: <EditForm />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return (
    <div>
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
