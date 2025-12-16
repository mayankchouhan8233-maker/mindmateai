"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatBot from "@/ChatBot";
import EmotionCamera from "@/EmotionCamera";
import SifraAvatar from "@/SifraAvatar";
import YoutubeFun from "@/YoutubeFun";
import StressAnalytics from "@/StressAnalytics";
import Therapist from "@/Therapist";
import Settings from "@/Settings";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [showAlert, setShowAlert] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleEmergency = () => {
    setEmergencyMode(true);
    setShowAlert(true);
    // Alert animation
    setTimeout(() => setShowAlert(false), 3000);
  };

  if (!user) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Emergency Alert */}
      {showAlert && (
        <div className="fixed top-4 right-4 z-50 bg-red-600/90 backdrop-blur-xl border border-red-400 rounded-lg p-4 animate-bounce">
          <p className="font-semibold">🆘 Emergency Alert Sent!</p>
          <p className="text-sm text-red-100">Help is being contacted...</p>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              MindMate
            </h1>
            <p className="text-gray-400 text-sm">Welcome, {user.name}! 🧠</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Emergency Button */}
            <button
              onClick={handleEmergency}
              className={`px-4 py-2 rounded-lg font-semibold transition transform hover:scale-110 ${
                emergencyMode
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-red-500/20 hover:bg-red-500/40 border border-red-500"
              }`}
            >
              🆘 SOS
            </button>

            {/* Settings & Logout */}
            <button
              onClick={() => setActiveTab("settings")}
              className="px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg transition"
            >
              ⚙️ Settings
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="sticky top-16 z-30 bg-slate-900/50 backdrop-blur border-b border-purple-500/10">
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <div className="flex gap-2 px-4 py-3">
            {[
              { id: "home", label: "🏠 Home", icon: "home" },
              { id: "stress", label: "📊 Stress Test", icon: "stress" },
              { id: "chat", label: "💬 Chat", icon: "chat" },
              { id: "sifra", label: "🤖 SIFRA Avatar", icon: "sifra" },
              { id: "youtube", label: "🎬 Fun", icon: "youtube" },
              { id: "motivation", label: "✨ Motivation", icon: "motivation" },
              { id: "therapist", label: "👨‍⚕️ Therapist", icon: "therapist" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                    : "bg-slate-700/30 hover:bg-slate-700/50 text-gray-300"
                }`}
              >
                {tab.label}
            </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Home Dashboard */}
        {activeTab === "home" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <div className="md:col-span-3 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-xl">
              <h2 className="text-3xl font-bold mb-3">Hello, {user.name}! 👋</h2>
              <p className="text-gray-300 mb-4">
                Welcome to MindMate, your personal AI stress relief companion. Today, let's take care of your mental wellbeing.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => setActiveTab("stress")}
                  className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition transform hover:scale-105"
                >
                  Start Stress Test
                </button>
                <button
                  onClick={() => setActiveTab("sifra")}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition transform hover:scale-105"
                >
                  Talk to SIFRA
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-slate-800/50 border border-purple-500/20 rounded-2xl p-6 backdrop-blur">
              <h3 className="text-cyan-300 text-lg font-semibold mb-4">📈 Your Progress</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Stress Level</p>
                  <div className="bg-slate-700/50 rounded-full h-2 mt-1 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-400 to-cyan-400 h-full w-35%"></div>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Mood Score</p>
                  <div className="bg-slate-700/50 rounded-full h-2 mt-1 overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full w-60%"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-slate-800/50 border border-purple-500/20 rounded-2xl p-6 backdrop-blur">
              <h3 className="text-purple-300 text-lg font-semibold mb-4">💡 Daily Tip</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Take 5 minutes to breathe deeply. Inhale for 4 counts, hold for 4, exhale for 4. This can instantly reduce stress.
              </p>
            </div>

            {/* Resources */}
            <div className="bg-slate-800/50 border border-purple-500/20 rounded-2xl p-6 backdrop-blur">
              <h3 className="text-cyan-300 text-lg font-semibold mb-4">🎯 Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("youtube")}
                  className="w-full text-left px-3 py-2 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition text-sm"
                >
                  🎬 Watch Something Funny
                </button>
                <button
                  onClick={() => setActiveTab("motivation")}
                  className="w-full text-left px-3 py-2 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition text-sm"
                >
                  ✨ Get Inspired
                </button>
                <button
                  onClick={() => setActiveTab("chat")}
                  className="w-full text-left px-3 py-2 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition text-sm"
                >
                  💬 Chat with SIFRA
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stress Test */}
        {activeTab === "stress" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Stress Assessment 📊</h2>
            <EmotionCamera />
            <StressAnalytics />
          </div>
        )}

        {/* Chat */}
        {activeTab === "chat" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Chat with SIFRA 💬</h2>
            <ChatBot />
          </div>
        )}

        {/* SIFRA Avatar */}
        {activeTab === "sifra" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Meet SIFRA - Your AI Companion 🤖</h2>
            <SifraAvatar />
          </div>
        )}

        {/* YouTube Fun */}
        {activeTab === "youtube" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Relax & Laugh 🎬</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <YoutubeFun />
              <div className="bg-slate-800/50 border border-purple-500/20 rounded-2xl p-6 backdrop-blur">
                <h3 className="text-cyan-300 text-lg font-semibold mb-4">Playlist Recommendations</h3>
                <div className="space-y-3">
                  {["Stand-up Comedy", "Funny Fails", "Cat Videos", "Feel-Good Stories"].map((item) => (
                    <button key={item} className="w-full text-left px-4 py-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition">
                      ▶️ {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Motivation */}
        {activeTab === "motivation" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-600/40 to-pink-600/40 border border-purple-500/30 rounded-2xl p-8 backdrop-blur">
              <h3 className="text-2xl font-bold mb-4">✨ Daily Affirmation</h3>
              <p className="text-xl text-purple-100 leading-relaxed mb-6">
                "You are stronger than you believe. Every challenge is an opportunity for growth. You've got this!"
              </p>
              <button className="px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition">
                New Affirmation
              </button>
            </div>

            <div className="bg-gradient-to-br from-cyan-600/40 to-blue-600/40 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur">
              <h3 className="text-2xl font-bold mb-4">🧘 Guided Meditation</h3>
              <p className="text-gray-300 mb-4">Find inner peace with guided meditations</p>
              <div className="space-y-2">
                {["5-min Breathing", "10-min Relaxation", "Sleep Meditation"].map((item) => (
                  <button key={item} className="w-full text-left px-4 py-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition text-sm">
                    ▶️ {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Therapist */}
        {activeTab === "therapist" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">Professional Help 👨‍⚕️</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Therapist />
              <div className="bg-slate-800/50 border border-purple-500/20 rounded-2xl p-6 backdrop-blur">
                <h3 className="text-cyan-300 text-lg font-semibold mb-4">Emergency Contacts</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-300 font-semibold">National Helpline</p>
                    <p className="text-white text-lg font-bold">1-800-273-8255</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-blue-300 font-semibold">Crisis Text Line</p>
                    <p className="text-white">Text HOME to 741741</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === "settings" && (
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-6">Settings ⚙️</h2>
            <Settings />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-500/10 mt-12 py-6 text-center text-gray-400 text-sm">
        <p>MindMate © 2024 | Your mental health matters. SIFRA is here to help. 💙</p>
      </footer>
    </div>
  );
}
