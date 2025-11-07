import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AnimatedRoutes from "./components/AnimatedRoutes";
import ChatSupport from "./components/ChatSupport";
import DemoBanner from "./components/DemoBanner";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <DemoBanner />
        <main className="flex-grow pt-16 lg:pt-20">
          <AnimatedRoutes />
        </main>
        <Footer />
        <ChatSupport />
      </div>
    </Router>
  );
}

export default App;
