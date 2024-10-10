//Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomersRoutes from "./routes/CustomerRoutes";
import OrderRoutes from "./routes/OrderRoutes";

//Providers
import { ThemeProvider } from "./components/ThemeProvider";

//Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import InvoicesPage from "./pages/invoices/InvoicesPage";

//Components
import Layout from "./components/layout/Layout";
import WelcomePage from "./pages/WelcomePage";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useEffect } from "react";
import { supabase } from "./services/supabase";
import { clearSession, setSession } from "./redux/features/auth/authslice";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        dispatch(setSession(session));
      } else {
        dispatch(clearSession());
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        dispatch(clearSession());
      } else if (session) {
        dispatch(setSession(session));
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  const session = useAppSelector((state) => state.auth.session);
  console.log(session);

  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Unauthenticated routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/welcome" element={<WelcomePage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/customers/*" element={<CustomersRoutes />} />
              <Route path="/orders/*" element={<OrderRoutes />} />
              <Route path="/invoices/*" element={<InvoicesPage />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
