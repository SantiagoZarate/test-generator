import { Layout } from "./Layout";
import { Routes, Route } from "react-router-dom";
import { BasicTestPage } from "./pages/basic-test";
import { HomePage } from "./pages/home";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/basic-test" element={<BasicTestPage />} />
      </Route>
    </Routes>
  );
}
