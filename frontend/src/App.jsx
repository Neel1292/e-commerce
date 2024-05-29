import "flowbite";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./assets/components/RootLayout";
import Login from "./assets/Pages/Login";
import Signup from "./assets/Pages/Signup";
import Logout from "./assets/Pages/Logout";
import Home from "./assets/Pages/Home";
import Cart from "./assets/Pages/Cart";
import UserProfile from "./assets/Pages/UserProfile";
import ProductDetails from "./assets/Pages/ProductDetails";
import AdminUsers from "./assets/Pages/AdminUsers";
import AdminProducts from "./assets/Pages/AdminProducts";
import Success from "./assets/components/payment_result/Success";
import Cancel from "./assets/components/payment_result/Cancel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "profile", element: <UserProfile /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "admin/products", element: <AdminProducts /> },
      { path: "admin/users", element: <AdminUsers /> },
      { path: "success/payment", element: <Success /> },
      { path: "cancel/payment", element: <Cancel /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/logout", element: <Logout /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
