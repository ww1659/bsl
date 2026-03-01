//Routing
import { useEffect } from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

//Components
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
//Providers
import { ThemeProvider } from './components/ThemeProvider';
//Pages
import HomePage from './pages/HomePage';
import InventoryPage from './pages/inventory/InventoryPage';
import NotFoundPage from './pages/NotFoundPage';
import PickingListPage from './pages/pickingList/PickingListPage';
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';
import { clearSession, setSession } from './redux/features/auth/authslice';
import { useAppDispatch } from './redux/hooks';
import CustomersRoutes from './routes/CustomerRoutes';
import LoginRoutes from './routes/LoginRoutes';
import OrderRoutes from './routes/OrderRoutes';
import { supabase } from './services/supabase';

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
      if (event === 'SIGNED_OUT') {
        dispatch(clearSession());
      } else if (session) {
        dispatch(setSession(session));
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Routes accessible only when the user is NOT logged in */}
            <Route element={<PublicRoute />}>
              <Route path="/login/*" element={<LoginRoutes />} />
              {process.env.NODE_ENV === 'development' && (
                <Route path="/signup" element={<SignUpPage />} />
              )}
            </Route>
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/picking-list" element={<PickingListPage />} />
              <Route path="/customers/*" element={<CustomersRoutes />} />
              <Route path="/orders/*" element={<OrderRoutes />} />
              <Route path="inventory/" element={<InventoryPage />} />
              {/* <Route path="/invoices/*" element={<InvoicesPage />} /> */}

              {/* 404 Not Found Page */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
