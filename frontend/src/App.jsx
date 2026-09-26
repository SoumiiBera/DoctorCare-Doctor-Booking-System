import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import Appointment from "./pages/Appointment";
import MyAppointments from "./pages/MyAppointments";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Emergency from "./pages/Emergency";

import "./App.css";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            {/* Public Pages */}
            <Route path="/" element={<Home />} />

            <Route path="/doctors" element={<Doctors />} />

            <Route
              path="/doctor/:id"
              element={<DoctorProfile />}
            />

            <Route
              path="/appointment/:doctorId"
              element={<Appointment />}
            />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/about" element={<About />} />

            <Route path="/emergency" element={<Emergency />} />

            {/* Protected Pages */}
            <Route element={<ProtectedRoute />}>

              <Route
                path="/appointments"
                element={<MyAppointments />}
              />

            </Route>

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;