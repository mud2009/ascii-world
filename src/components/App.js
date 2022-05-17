import React from "react";
import MyNavbar from "./MyNavbar";
import AppRoutes from "./AppRoutes";
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"

function App() {
  return (
    <>
      <AuthProvider>
      <MyNavbar />
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
        <div id="mainContainer" className="w-100" style={{maxWidth: '825px'}}>
          <AppRoutes/>
        </div>
      </Container>
      </AuthProvider>
    </>
  );
}

export default App;
