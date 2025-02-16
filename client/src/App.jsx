import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MdKeyboardDoubleArrowUp } from 'react-icons/md';
import RingSize from './Pages/RingSize';
import TestDriveForm from './components/TestDriveForm';
import Enquiry from './Pages/Enquiry';
import TestDrive from './Pages/TestDrive';

const Home = lazy(() => import('@/Pages/Home'));
const BikePage = lazy(() => import('@/Pages/BikePage'));
const ScootyPage = lazy(() => import('@/Pages/ScootyPage'));
const About = lazy(() => import('@/Pages/About'));
const Insurance = lazy(() => import('@/Pages/Insurance'));
const BikePreview = lazy(() => import('@/Pages/BikePreview'));
const Contact = lazy(() => import('@/Pages/Contact'));
const Service = lazy(() => import('@/Pages/Service'));
const Exchange = lazy(() => import('@/Pages/Exchange'));
const Finance = lazy(() => import('@/Pages/Finance'));
const EMICalculator = lazy(() => import('@/Pages/EMICalculator'));
const AllAccessories = lazy(() => import('@/Pages/AllAccessories'));
const ScootyPreview = lazy(() => import('@/Pages/ScootyPreview'));

const App = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };


  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsVisible(window.scrollY > 50);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToTop()
  }, [location]);

  return (
    <Suspense fallback={<div className="h-screen text-center text-white bg-mainBg">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bike" element={<BikePage />} />
        <Route path="/scooty" element={<ScootyPage />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/bike/:id" element={<BikePreview />} />
        <Route path="/scooty/:id" element={<ScootyPreview />} />
        <Route path="/book-test-drive" element={<TestDrive />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/emi-calculator" element={<EMICalculator />} />
        <Route path="/ring" element={<RingSize />} />
        <Route path="/accessories" element={<AllAccessories />} />
      </Routes>
      <div className="fixed z-20 bottom-4 right-4">
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="relative inline-block p-px text-sm font-semibold leading-6 text-white no-underline rounded-md shadow-2xl cursor-pointer bg-slate-800 group shadow-zinc-900"
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-md bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,0,0,0.8)_0%,rgba(255,0,0,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative z-10 flex items-center p-1 rounded-md bg-zinc-950 ring-1 ring-white/10">
              <MdKeyboardDoubleArrowUp className="text-2xl" />
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-red-400/0 via-red-400/90 to-red-400/0 transition-opacity duration-500 group-hover:opacity-60" />
          </button>
        )}
      </div>
    </Suspense>

  );
};

export default App;
