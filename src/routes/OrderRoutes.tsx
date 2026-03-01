import { Route,Routes } from "react-router-dom";

import CreateOrderPage from "@/pages/orders/CreateOrderPage";
import OrderDetailPage from "@/pages/orders/OrderDetailPage";
import OrdersPage from "@/pages/orders/OrdersPage";

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
