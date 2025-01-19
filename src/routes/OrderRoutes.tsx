import { Routes, Route } from "react-router-dom";
import CreateOrderPage from "@/pages/orders/CreateOrderPage";
import OrdersPage from "@/pages/orders/OrdersPage";
import OrderDetailPage from "@/pages/orders/OrderDetailPage";

function OrderRoutes() {
  return (
    <Routes>
      <Route path="/" element={<OrdersPage />} />
      <Route path="/create" element={<CreateOrderPage />} />
      <Route path="/:orderId" element={<OrderDetailPage />} />
    </Routes>
  );
}

export default OrderRoutes;
