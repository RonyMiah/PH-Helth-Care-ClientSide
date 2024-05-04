import HeroSection from '@/components/UI/HomePage/HeroSection/HeroSection';
import HowItWorks from '@/components/UI/HomePage/HowItWorks/HowItWorks';
import Specialist from '@/components/UI/HomePage/Specialist/Specialist';
import Status from '@/components/UI/HomePage/Status/Status';
import TopRatedDoctors from '@/components/UI/HomePage/TopRatedDoctors/TopRatedDoctors';
import WhyUs from '@/components/UI/HomePage/WhyUs/WhyUs';
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Specialist />
      <TopRatedDoctors />
      <WhyUs />
      <HowItWorks />
      <Status />
    </div>
  );
};

export default HomePage;
