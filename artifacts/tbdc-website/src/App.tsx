import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RouterPage from './components/router/RouterPage';
import ScaleupPage from './components/scaleup/ScaleupPage';
import StartupPage from './components/startup/StartupPage';
import PartnersPage from './components/partners/PartnersPage';
import TeamPage from './components/team/TeamPage';
import MediaPage from './components/media/MediaPage';
import NoiseOverlay from './components/shared/NoiseOverlay';
import ScrollProgress from './components/shared/ScrollProgress';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/+$/, '') || '/'}>
      <NoiseOverlay />
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<RouterPage />} />
        <Route path="/scaleup" element={<ScaleupPage />} />
        <Route path="/startup" element={<StartupPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/media" element={<MediaPage />} />
      </Routes>
    </BrowserRouter>
  );
}
