import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from '../features/home/HomePage';
import CoachesPage from '../features/coaches/CoachesPage';
import ExercisesPage from '../features/excercises/ExcersicesPage';
import AthletesPage from '../features/atlethes/AthletesPage';
import TrainingPage from "../features/trainings/TraininigPage";
import "../index.css";
import LayoutPostLogin from "../layouts/LayoutPostLogin";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPostLogin />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/coaches" element={<CoachesPage />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route path="/athletes" element={<AthletesPage />} />
        <Route path="/trainings" element={<TrainingPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </BrowserRouter >
  )
}

export default App
