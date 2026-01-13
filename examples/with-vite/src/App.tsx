import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { IsServerDemo } from './pages/demos/IsServerDemo';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demos/is-server" element={<IsServerDemo />} />
      </Routes>
    </BrowserRouter>
  );
}
