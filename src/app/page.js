"use client"
import GoogleMap from './lib/GoogleMap';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 via-desert_sand-50 to-old_rose-50 pt-32 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 min-h-[calc(100vh-12rem)]">

          {/* Main Map Card */}
          <div className="md:col-span-2 lg:col-span-3 bg-white/95 backdrop-blur-xl rounded-6xl p-8 shadow-bento border border-desert_sand-200/40 hover:shadow-bento-hover transition-all duration-500 group">
            <div className="h-full rounded-5xl overflow-hidden bg-gradient-to-br from-peach-50/50 to-desert_sand-50/50 relative">
              <GoogleMap />
              {/* Floating indicator */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md rounded-capsule px-4 py-2 shadow-medium">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-peach-500 rounded-full animate-pulse-soft"></div>
                  <span className="text-sm font-medium text-mountbatten_pink-700">Live</span>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel with stacked bento cards */}
          <div className="space-y-8">

            {/* Welcome Card */}
            <div className="bg-gradient-to-br from-peach-500 via-coral_pink-500 to-old_rose-500 rounded-6xl p-8 shadow-bento text-white relative overflow-hidden group hover:scale-105 transition-transform duration-300">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-6xl"></div>
              <div className="relative z-10">
                <h1 className="text-2xl font-bold mb-3">Free Meal Finder</h1>
                <p className="text-peach-100 text-sm leading-relaxed">Connecting communities through compassion</p>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            </div>

            {/* Stats Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-6xl p-8 shadow-bento border border-desert_sand-200/40 hover:shadow-bento-hover transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-peach-600 to-coral_pink-600 bg-clip-text text-transparent mb-2">
                  150+
                </div>
                <div className="text-mountbatten_pink-600 text-sm font-medium tracking-wide">Active Locations</div>
                <div className="mt-4 h-2 bg-gradient-to-r from-desert_sand-100 to-peach-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-peach-500 to-coral_pink-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Quick Action Card */}
            <div className="bg-gradient-to-br from-light_coral-500 via-melon-500 to-coral_pink-500 rounded-6xl p-8 shadow-bento text-white relative overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-6xl"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-4">Get Started</h3>
                <button className="w-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-4 rounded-capsule font-medium transition-all duration-300 border border-white/20 hover:shadow-peach-glow">
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
