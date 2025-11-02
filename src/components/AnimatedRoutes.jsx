import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import Home from "../pages/Home";
import AIPlanner from "../pages/AIPlanner";
import Destinations from "../pages/Destinations";
import DestinationDetail from "../pages/DestinationDetail";
import Tours from "../pages/Tours";
import LocalBuddy from "../pages/LocalBuddy";
import GuideDetail from "../pages/GuideDetail";
import CommunityV2 from "../pages/CommunityV2";
import Community from "../pages/Community";
import CommunityBackup from "../pages/CommunityBackup";
import About from "../pages/About";
import Contact from "../pages/Contact";
import TourDetail from "../pages/TourDetail";
import UserProfile from "../pages/UserProfile";
import Hotels from "../pages/Hotels";
import HotelDetail from "../pages/HotelDetail";
import Restaurants from "../pages/Restaurants";
import RestaurantDetail from "../pages/RestaurantDetail";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/ai-planner"
          element={
            <PageTransition>
              <AIPlanner />
            </PageTransition>
          }
        />
        <Route
          path="/destinations"
          element={
            <PageTransition>
              <Destinations />
            </PageTransition>
          }
        />
        <Route
          path="/destinations/:id"
          element={
            <PageTransition>
              <DestinationDetail />
            </PageTransition>
          }
        />
        <Route
          path="/tours"
          element={
            <PageTransition>
              <Tours />
            </PageTransition>
          }
        />
        <Route
          path="/tours/:id"
          element={
            <PageTransition>
              <TourDetail />
            </PageTransition>
          }
        />
        <Route
          path="/local-buddy"
          element={
            <PageTransition>
              <LocalBuddy />
            </PageTransition>
          }
        />
        <Route
          path="/local-buddy/:guideId"
          element={
            <PageTransition>
              <GuideDetail />
            </PageTransition>
          }
        />
        <Route
          path="/community"
          element={
            <PageTransition>
              <Community />
            </PageTransition>
          }
        />

        <Route
          path="/community/v2"
          element={
            <PageTransition>
              <CommunityV2 />
            </PageTransition>
          }
        />

        <Route
          path="/community/old"
          element={
            <PageTransition>
              <CommunityBackup />
            </PageTransition>
          }
        />

        <Route
          path="/community/profile/:userId"
          element={
            <PageTransition>
              <UserProfile />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        <Route
          path="/booking/hotels"
          element={
            <PageTransition>
              <Hotels />
            </PageTransition>
          }
        />
        <Route
          path="/booking/hotels/:slug"
          element={
            <PageTransition>
              <HotelDetail />
            </PageTransition>
          }
        />
        <Route
          path="/booking/restaurants"
          element={
            <PageTransition>
              <Restaurants />
            </PageTransition>
          }
        />
        <Route
          path="/booking/restaurants/:slug"
          element={
            <PageTransition>
              <RestaurantDetail />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
