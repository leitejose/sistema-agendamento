import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";
import { AuthProvider } from "./context/authContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login/login";
import RecoverAccount from "./pages/RecoverAccount/recover-account";
import NewPassword from "./pages/NewPassword/new-password";
import HomeScreen from "./pages/HomeScreen/home-screen";
import UtentesScreen from "./pages/UtentesScreen/utentes-screen";
import CollaboratorsScreen from "./pages/CollaboratorsScreen/collaborators-screen";
import ServicesScreen from "./pages/ServicesScreen/services-screen";
import StatisticsScreen from "./pages/StatisticsScreen/statistics-screen";
import VacanceScreen from "./pages/SettingsPages/VacanceScreen/vacance-screen";
import RoleScreen from "./pages/SettingsPages/RoleScreen/role-screen";
import PermissionScreen from "./pages/SettingsPages/PermissionScreen/permission-screen";
import MarkingsScreen from "./pages/MarkingsScreen/markings-screen";
import PdfGenerate from "./pages/MarkingsScreen/PdfGenerate/pdf-generate";
import PdfCliente from "./pages/UtentesScreen/PdfGenerate/pdf-cliente";
import DisponibilidadeScreen from "./pages/SettingsPages/availabilityScreen/availability-screen";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recover-account" element={<RecoverAccount />} />
            <Route path="/new-password" element={<NewPassword />} />
            <Route path="/relatorio-pdf" element={<PdfGenerate />} />
            <Route path="/pdf-cliente/:id" element={<PdfCliente />} />

            {/* Rotas privadas */}
            <Route
              path="/home-screen"
              element={
                <PrivateRoute>
                  <HomeScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/markings-screen"
              element={
                <PrivateRoute>
                  <MarkingsScreen/>
                </PrivateRoute>
              }
            />
            <Route
              path="/utentes-screen"
              element={
                <PrivateRoute>
                  <UtentesScreen/>
                </PrivateRoute>
              }
            />
            <Route
              path="/collaborators-screen"
              element={
                <PrivateRoute>
                  <CollaboratorsScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/services-screen"
              element={
                <PrivateRoute>
                  <ServicesScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/statistics-screen"
              element={
                <PrivateRoute>
                  <StatisticsScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/vacance-screen"
              element={
                <PrivateRoute>
                  <VacanceScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/role-screen"
              element={
                <PrivateRoute>
                  <RoleScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/permission-screen"
              element={
                <PrivateRoute>
                  <PermissionScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/availability-screen"
              element={
                <PrivateRoute>
                  < DisponibilidadeScreen/>
                </PrivateRoute>
                
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </ApolloProvider>
  );
};

export default App;
