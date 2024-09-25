import CustomerDetailPage from "@/pages/customers/CustomerDetailPage";
import CustomersPage from "@/pages/customers/CustomersPage";
import { Routes, Route } from "react-router-dom";

function CustomersRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CustomersPage />} />
      <Route path=":customerName" element={<CustomerDetailPage />} />
    </Routes>
  );
}

export default CustomersRoutes;
