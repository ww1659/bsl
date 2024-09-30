import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import InvoicesPage from "./pages/invoices/InvoicesPage";
import OrdersPage from "./pages/orders/OrdersPage";
import CustomersRoutes from "./routes/CustomerRoutes";
import { ThemeProvider } from "./components/ThemeProvider";
import Layout from "./components/Layout/Layout";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Top-level routes */}

            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Grouped Customer routes */}
            <Route path="/customers/*" element={<CustomersRoutes />} />
            <Route path="/invoices" element={<InvoicesPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
