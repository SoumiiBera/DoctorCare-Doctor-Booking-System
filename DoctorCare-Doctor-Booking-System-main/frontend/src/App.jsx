import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";
import { LanguageProvider } from "./context/LanguageProvider";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { Spinner } from "./components/StateMessage";

import Home from "./pages/Home";

const Doctors = lazy(() => import("./pages/Doctors"));
const DoctorProfile = lazy(() => import("./pages/DoctorProfile"));
const Appointment = lazy(() => import("./pages/Appointment"));
const MyAppointments = lazy(() => import("./pages/MyAppointments"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const About = lazy(() => import("./pages/About"));
const Emergency = lazy(() => import("./pages/Emergency"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/doctor/:id" element={<DoctorProfile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/emergency" element={<Emergency />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/appointment/:doctorId" element={<Appointment />} />
                  <Route path="/appointments" element={<MyAppointments />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
