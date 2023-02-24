import React from 'react';
import Redirect from './components/Redirect';
import { Routes, Route } from 'react-router-dom';

// ------ App pages
const Page404 = React.lazy(() => import('./pages/404'));
const HomePage = React.lazy(() => import('./pages/Home'));
const ErrorPage = React.lazy(() => import('./pages/Error'));
const ProfilePage = React.lazy(() => import('./pages/Profile'));
const LandingPage = React.lazy(() => import('./pages/Landing'));
const DashboardPage = React.lazy(() => import('./pages/Dashboard'));
const CovidCheckPage = React.lazy(() => import('./pages/CovidCheck'));

function App() {
  return (
    <React.Suspense fallback={<Redirect message='Have a nice day' />}>
      <Routes>
        <Route path='/' element={<LandingPage />} errorElement={<ErrorPage />} />
        <Route path='/app' element={<HomePage />} errorElement={<ErrorPage />}>
          <Route path='check' element={<CovidCheckPage />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='dashboard' element={<DashboardPage />} />
        </Route>
        <Route path='/callback' element={<Redirect message="We're redictring you" />} errorElement={<ErrorPage />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
