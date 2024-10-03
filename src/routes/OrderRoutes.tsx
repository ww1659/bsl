import { Routes, Route } from "react-router-dom";
import CreateOrderPage from "@/pages/orders/CreateOrderPage";
import OrdersPage from "@/pages/orders/OrdersPage";

function OrderRoutes() {
  return (
    <Routes>
      <Route path="/" element={<OrdersPage />} />
      <Route path="/create" element={<CreateOrderPage />} />
    </Routes>
  );
}

export default OrderRoutes;
