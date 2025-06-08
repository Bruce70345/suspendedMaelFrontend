"use client"
import React from 'react';
import { animate, utils } from 'animejs';
import GoogleMap from './lib/GoogleMap';

export default function Home() {
  const mapCardRef = React.useRef(null);
  const welcomeCardRef = React.useRef(null);
  const statsCardRef = React.useRef(null);
  const actionCardRef = React.useRef(null);
  const statsNumberRef = React.useRef(null);
  const progressBarRef = React.useRef(null);
  const liveIndicatorRef = React.useRef(null);

  React.useEffect(() => {
    // 卡片入場動畫
    const cards = [mapCardRef.current, welcomeCardRef.current, statsCardRef.current, actionCardRef.current];

    animate(cards, {
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 800,
      ease: 'outQuart',
      delay: (el, i) => i * 200
    });

    // 統計數字動畫 - 修正小數點問題
    if (statsNumberRef.current) {
      animate(statsNumberRef.current, {
        innerHTML: [0, 150],
        duration: 2000,
        delay: 1000,
        ease: 'outQuart',
        modifier: utils.round(0)
      });
    }

    // 進度條動畫
    if (progressBarRef.current) {
      animate(progressBarRef.current, {
        width: ['0%', '75%'],
        duration: 1500,
        ease: 'outQuart',
        delay: 1500
      });
    }

    // 地圖呼吸效果 - 更明顯的循環動畫
    if (liveIndicatorRef.current) {
      animate(liveIndicatorRef.current, {
        scale: [1, 1.5, 1],
        opacity: [0.6, 1, 0.6],
        duration: 2000,
        ease: 'inOutSine',
        loop: true
      });
    }

  }, []);

  // 卡片點擊動畫 - 適合手機觸控
  const handleCardClick = (e) => {
    animate(e.currentTarget, {
      scale: [1, 0.98, 1],
      duration: 200,
      ease: 'outQuart'
    });
  };

  // 按鈕點擊動畫
  const handleButtonClick = (e) => {
    animate(e.currentTarget, {
      scale: [1, 0.95, 1],
      duration: 200,
      ease: 'outQuart'
    });
  };

  return (
    <div className="page-container min-h-screen bg-gradient-to-br from-peach-50 via-desert_sand-50 to-old_rose-50 pt-32 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 min-h-[calc(100vh-12rem)]">

          {/* Main Map Card */}
          <div
            ref={mapCardRef}
            className="md:col-span-2 lg:col-span-3 bento-card p-8 group cursor-pointer"
            onClick={handleCardClick}
          >
            <div className="h-full rounded-5xl overflow-hidden bg-peach-50/50 relative">
              <GoogleMap />
              {/* Floating indicator */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md rounded-capsule px-4 py-2 shadow-medium">
                <div className="flex items-center space-x-2">
                  <div
                    ref={liveIndicatorRef}
                    className="w-3 h-3 bg-peach-500 rounded-full"
                  ></div>
                  <span className="text-sm font-medium text-mountbatten_pink-700">Live</span>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel with stacked bento cards */}
          <div className="space-y-8">

            {/* Welcome Card */}
            <div
              ref={welcomeCardRef}
              className="bg-peach-500 rounded-6xl p-8 shadow-bento text-white relative overflow-hidden group transition-transform duration-300 cursor-pointer"
              onClick={handleCardClick}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 bg-white/10 rounded-6xl"></div>
              <div className="relative z-10">
                <h1 className="text-2xl font-bold mb-3">Suspended Meal Finder</h1>
                <p className="text-peach-100 text-sm leading-relaxed">Connecting communities through compassion</p>
              </div>
            </div>

            {/* Stats Card */}
            <div
              ref={statsCardRef}
              className="bento-card p-8 cursor-pointer"
              onClick={handleCardClick}
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-peach-600 mb-2 min-w-[120px] mx-auto">
                  <span ref={statsNumberRef} className="inline-block w-16 text-right">0</span>+
                </div>
                <div className="text-mountbatten_pink-600 text-sm font-medium tracking-wide">Active Locations</div>
                <div className="mt-4 h-2 bg-desert_sand-100 rounded-full overflow-hidden">
                  <div
                    ref={progressBarRef}
                    className="h-full bg-peach-500 rounded-full"
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Quick Action Card */}
            <div
              ref={actionCardRef}
              className="bg-light_coral-500 rounded-6xl p-8 shadow-bento text-white relative overflow-hidden transition-transform duration-300 cursor-pointer"
              onClick={handleCardClick}
            >
              <div className="absolute inset-0 bg-white/10 rounded-6xl"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-4">Get Started</h3>
                <button
                  className="w-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-4 rounded-capsule font-medium transition-all duration-300 border border-white/20 hover:shadow-medium"
                  onClick={handleButtonClick}
                >
                  Find Nearby Meals
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
