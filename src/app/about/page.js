'use client'
import React from 'react';
import { animate } from 'animejs';

export default function About() {
  const originCardRef = React.useRef(null);
  const goalCardRef = React.useRef(null);
  const featuresCardRef = React.useRef(null);
  const titleRef = React.useRef(null);

  React.useEffect(() => {
    // 標題入場動畫
    if (titleRef.current) {
      animate(titleRef.current, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        ease: 'outQuart',
        delay: 200
      });
    }

    // 卡片依序入場動畫
    const cards = [originCardRef.current, goalCardRef.current, featuresCardRef.current];
    animate(cards, {
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 800,
      ease: 'outQuart',
      delay: (el, i) => 400 + (i * 200)
    });
  }, []);

  // 卡片點擊動畫
  const handleCardClick = (e) => {
    animate(e.currentTarget, {
      scale: [1, 0.98, 1],
      duration: 200,
      ease: 'outQuart'
    });
  };

  return (
    <div className="page-container min-h-screen bg-gradient-to-br from-peach-50 via-desert_sand-50 to-old_rose-50 pt-32 p-6 overflow-y-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Page Title */}
        <div
          ref={titleRef}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-redwood-700 mb-4">
            About us
          </h1>
          <div className="w-24 h-1 bg-peach-500 rounded-full mx-auto"></div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

          {/* Origin Card */}
          <div
            ref={originCardRef}
            className="bento-card p-8 cursor-pointer"
            onClick={handleCardClick}
          >
            <div className="relative">
              <h2 className="text-2xl font-bold text-peach-600 mb-6">Origin</h2>
              <p className="text-redwood-600 leading-relaxed">
                Our story began with a heartbreaking news: a poor person stole fruit because they didn&apos;t have money to eat. This news touched our hearts and made us realize that many people were struggling to find food for their next meal. However, we also discovered that there are many kind-hearted restaurants willing to provide free meals. So, we decided to create a platform to integrate these resources, so that those in need can easily obtain these suspended meals.
              </p>

            </div>
          </div>

          {/* Goal Card */}
          <div
            ref={goalCardRef}
            className="bg-light_coral-500 rounded-6xl p-8 shadow-bento text-white relative overflow-hidden cursor-pointer"
            onClick={handleCardClick}
          >
            <div className="absolute inset-0 bg-white/10 rounded-6xl"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-6">Our goal</h2>
              <p className="text-light_coral-100 leading-relaxed">
                Our goal is to connect individuals in need with restaurants willing to provide help through the suspended meal map platform. We hope that through this platform, not only can we solve the problem of hunger, but also promote community love and help.
              </p>
            </div>
          </div>

        </div>

        {/* Features Card - Full Width */}
        <div
          ref={featuresCardRef}
          className="bento-card p-8 cursor-pointer"
          onClick={handleCardClick}
        >
          <div className="relative">
            <h2 className="text-2xl font-bold text-peach-600 mb-6">Web features</h2>
            <p className="text-redwood-600 leading-relaxed mb-6">
              Our platform provides the following features:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-peach-50/60 rounded-4xl p-6 border border-peach-200/40">
                <div className="text-lg font-semibold text-redwood-700 mb-3">1. View restaurant supply situation</div>
                <p className="text-redwood-600 text-sm leading-relaxed">
                  Users can browse and search for nearby restaurants providing suspended meals, and understand the current supply situation of each restaurant.
                </p>
              </div>

              <div className="bg-desert_sand-50/60 rounded-4xl p-6 border border-desert_sand-200/40">
                <div className="text-lg font-semibold text-redwood-700 mb-3">2. Business information editing</div>
                <p className="text-redwood-600 text-sm leading-relaxed">
                  Registered businesses can edit and update meal information on the information page to ensure that users receive the latest supply information.
                </p>
              </div>

              <div className="bg-old_rose-50/60 rounded-4xl p-6 border border-old_rose-200/40">
                <div className="text-lg font-semibold text-redwood-700 mb-3">3. Resource integration</div>
                <p className="text-redwood-600 text-sm leading-relaxed">
                  Our platform will continue to collect and integrate more free resources to ensure that those in need can receive help.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
