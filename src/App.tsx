//Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomersRoutes from "./routes/CustomerRoutes";
import OrderRoutes from "./routes/OrderRoutes";

//Providers
import { ThemeProvider } from "./components/ThemeProvider";

//Pages
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import InvoicesPage from "./pages/invoices/InvoicesPage";

//Components
import Layout from "./components/layout/Layout";

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
            <Route path="/orders/*" element={<OrderRoutes />} />
            <Route path="/invoices/*" element={<InvoicesPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
