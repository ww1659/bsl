import CreateNewCustomerPage from "@/pages/customers/CreateNewCustomerPage";
import CreateNewGroupPage from "@/pages/customers/CreateNewGroupPage";
import CustomerDetailPage from "@/pages/customers/CustomerDetailPage";
import CustomerGroupPage from "@/pages/customers/CustomerGroupPage";
import GroupsPage from "@/pages/customers/GroupsPage";
import { Routes, Route } from "react-router-dom";

function CustomersRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GroupsPage />} />
      <Route path="/create-group" element={<CreateNewGroupPage />} />
      <Route path="/create-customer" element={<CreateNewCustomerPage />} />
      <Route path=":groupName" element={<CustomerGroupPage />} />
      <Route path=":groupName/:customerName" element={<CustomerDetailPage />} />
    </Routes>
  );
}

export default CustomersRoutes;
