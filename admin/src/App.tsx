import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import DashboardLoading from './components/DashboardLoading';

const Home = lazy(() => import('./Pages/Home'));
const AddBike = lazy(() => import('./Pages/AddBike'));
const AllBike = lazy(() => import('./Pages/AllBike'));
const AddScooty = lazy(() => import('./Pages/AddScooty'));
const AllScooty = lazy(() => import('./Pages/AllScooty'));
const AddAccessories = lazy(() => import('./Pages/AddAccessories'));
const AllAccessories = lazy(() => import('./Pages/AllAccessories'));
const AllForms = lazy(() => import('./Pages/AllForms'));
const Login = lazy(() => import('./Pages/Auth/Login'));
const ResetPassword = lazy(() => import('./Pages/Auth/ResetPassword'));

const App = () => {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:token/:email/:expiry" element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-bike" element={<AddBike />} />
          <Route path="/add-scooty" element={<AddScooty />} />
          <Route path="/all-bike" element={<AllBike />} />
          <Route path="/all-scooty" element={<AllScooty />} />
          <Route path="/add-accessories" element={<AddAccessories />} />
          <Route path="/all-accessories" element={<AllAccessories />} />
          <Route path="/all-forms" element={<AllForms />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
