import { TestPage } from '@/pages/[id]';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { BasicTestPage } from '../pages/basic-test/BasicTestPage';
import { HomePage } from '../pages/home/HomePage';
import { MultipleChoicePage } from '../pages/multiple-choice/MultipleChoiceTestPage';

export default function MainRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<TestPage />} />
        <Route path="/basic-test" element={<BasicTestPage />} />
        <Route path="/multiple-choice" element={<MultipleChoicePage />} />
      </Route>
    </Routes>
  );
}
