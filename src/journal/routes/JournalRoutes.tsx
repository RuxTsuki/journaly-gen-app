import React from "react";
import { Navigate, Route, Routes } from "react-router";
import JournalPage from "../pages/JournalPage";

type Props = {};

const JournalRoutes = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<JournalPage />} />

      <Route path="/*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default JournalRoutes;
