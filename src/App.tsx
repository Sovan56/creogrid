/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import CompareSection from './components/CompareSection';
import DiscoveryEngine from './components/DiscoveryEngine';
import CampaignFlow from './components/CampaignFlow';
import Calculator from './components/Calculator';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div id="app-root-container" className="bg-[#07050d] text-gray-100 min-h-screen font-sans selection:bg-brand-primary/30 selection:text-white antialiased overflow-x-hidden">
      {/* Absolute background floor elements */}
      <Header />
      
      <main id="app-main-content">
        <Hero />
        <CompareSection />
        <DiscoveryEngine />
        <CampaignFlow />
        <Calculator />
        <Testimonials />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
