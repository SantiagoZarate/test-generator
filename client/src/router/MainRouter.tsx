import { Routes, Route, BrowserRouter } from "react-router-dom";
import { BasicTestPage } from "../pages/basic-test";
import { HomePage } from "../pages/home";
import { MultipleChoicePage } from "../pages/multiple-choice";
import { MainLayout } from "../layouts/MainLayout";

export default function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/basic-test" element={<BasicTestPage />} />
          <Route path="/multiple-choice" element={<MultipleChoicePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}