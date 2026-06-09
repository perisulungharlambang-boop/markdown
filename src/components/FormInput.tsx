import React from "react";
import { ProjectInput } from "../types";
import { Code2, Compass, Cpu, Layers, Sparkles, Server, Cloud } from "lucide-react";

interface FormInputProps {
  input: ProjectInput;
  onChange: (updater: (prev: ProjectInput) => ProjectInput) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export default function FormInput({ input, onChange, onGenerate, isLoading }: FormInputProps) {
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleFrontend = (key: keyof ProjectInput["frontendStack"]) => {
    onChange((prev) => ({
      ...prev,
      frontendStack: {
        ...prev.frontendStack,
        [key]: !prev.frontendStack[key],
      },
    }));
  };

  const toggleBackend = (key: keyof ProjectInput["backendStack"]) => {
    onChange((prev) => ({
      ...prev,
      backendStack: {
        ...prev.backendStack,
        [key]: !prev.backendStack[key],
      },
    }));
  };

  const toggleHosting = (key: keyof ProjectInput["hosting"]) => {
    onChange((prev) => ({
      ...prev,
      hosting: {
        ...prev.hosting,
        [key]: !prev.hosting[key],
      },
    }));
  };

  const togglePlatform = (key: keyof ProjectInput["platforms"]) => {
    onChange((prev) => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [key]: !prev.platforms[key],
      },
    }));
  };

  const toggleExternal = (key: keyof ProjectInput["externalSystems"]) => {
    onChange((prev) => ({
      ...prev,
      externalSystems: {
        ...prev.externalSystems,
        [key]: !prev.externalSystems[key],
      },
    }));
  };

  return (
    <div id="form-container" className="space-y-6 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl max-h-[80vh] overflow-y-auto custom-scrollbar">
      {/* Project Basic Info */}
      <div id="project-basic-section" className="space-y-4">
        <label id="lbl-project-name" className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Nama Proyek / Aplikasi</span>
          <input
            id="input-project-name"
            type="text"
            name="projectName"
            value={input.projectName}
            onChange={handleTextChange}
            placeholder="Contoh: Pembuat README.MD atau TaskManager Pro"
            className="mt-1.5 w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </label>

        <label id="lbl-project-description" className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Deskripsi & Tujuan Project (Apa yang ingin dibuat?)</span>
          <textarea
            id="input-project-description"
            name="projectDescription"
            rows={4}
            value={input.projectDescription}
            onChange={handleTextChange}
            placeholder="Tuliskan ide aplikasi Anda di sini. Jelaskan fungsi utama, alur kerja, dan output yang Anda harapkan..."
            className="mt-1.5 w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
          />
        </label>
      </div>

      {/* Target Platforms */}
      <div id="platform-section" className="border-t border-slate-800/80 pt-5">
        <div id="platform-header" className="flex items-center gap-2 mb-3">
          <Compass className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Target Platform</h3>
        </div>
        <div id="platform-checkboxes" className="grid grid-cols-2 gap-2 text-xs">
          {Object.keys(input.platforms).map((key) => {
            const label = key === "web" ? "Web Browser" :
                          key === "androidCapacitor" ? "Android (Capacitor)" :
                          key === "androidReactNative" ? "Android (React Native)" :
                          key === "windowsTauri" ? "Windows (Tauri)" :
                          key === "windowsElectron" ? "Windows (Electron)" :
                          key === "iosCapacitor" ? "iOS (Capacitor)" : key;
            const active = input.platforms[key as keyof ProjectInput["platforms"]];
            return (
              <button
                key={key}
                type="button"
                id={`btn-plat-${key}`}
                onClick={() => togglePlatform(key as keyof ProjectInput["platforms"])}
                className={`flex items-center gap-2.5 px-3 py-2 border rounded-xl font-medium text-left transition-all ${
                  active
                    ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-300"
                    : "bg-slate-950 border-slate-800/60 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${active ? "border-indigo-400 bg-indigo-500" : "border-slate-700 bg-slate-950"}`}>
                  {active && <div className="w-1.5 h-1.5 bg-white rounded-full animate-scale-up" />}
                </div>
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Frontend Tech Stack */}
      <div id="frontend-tech-section" className="border-t border-slate-800/80 pt-5">
        <div id="frontend-tech-header" className="flex items-center gap-2 mb-3">
          <Code2 className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Frontend Tech Stack</h3>
        </div>
        <div id="frontend-checkboxes" className="grid grid-cols-2 gap-2 text-xs">
          {Object.keys(input.frontendStack).map((key) => {
            const label = key === "vite" ? "Vite Packager" :
                          key === "react" ? "React Library" :
                          key === "typescript" ? "TypeScript TS" :
                          key === "tailwind" ? "Tailwind CSS" :
                          key === "reactRouter" ? "React Router" :
                          key === "vue" ? "Vue.js Framework" :
                          key === "nuxt" ? "Nuxt.js Framework" :
                          key === "svelte" ? "Svelte" :
                          key === "nextjs" ? "Next.js (React)" :
                          key === "astro" ? "Astro Static" :
                          key === "angular" ? "Angular Framework" :
                          key === "solidjs" ? "SolidJS" :
                          key === "framerMotion" ? "Framer Motion" :
                          key === "reduxState" ? "Redux Toolkit" :
                          key === "piniaState" ? "Pinia State Store" : 
                          key === "shadcnUi" ? "Shadcn UI Component" :
                          key === "zustand" ? "Zustand State Store" :
                          key === "tanstackQuery" ? "TanStack Query" :
                          key === "sass" ? "Sass / SCSS" :
                          key === "bootstrap" ? "Bootstrap Framework" :
                          key === "materialUi" ? "Material UI (MUI)" :
                          key === "jquery" ? "jQuery Library" : key;
            const active = input.frontendStack[key as keyof ProjectInput["frontendStack"]];
            return (
              <button
                key={key}
                type="button"
                id={`btn-front-${key}`}
                onClick={() => toggleFrontend(key as keyof ProjectInput["frontendStack"])}
                className={`flex items-center gap-2.5 px-3 py-2 border rounded-xl font-medium text-left transition-all ${
                  active
                    ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-300"
                    : "bg-slate-950 border-slate-800/60 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${active ? "border-indigo-400 bg-indigo-500" : "border-slate-700 bg-slate-950"}`}>
                  {active && <div className="w-1.5 h-1.5 bg-white rounded-full animate-scale-up" />}
                </div>
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Backend Tech Stack */}
      <div id="backend-tech-section" className="border-t border-slate-800/80 pt-5">
        <div id="backend-tech-header" className="flex items-center gap-2 mb-3">
          <Server className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Backend & Database Stack</h3>
        </div>
        <div id="backend-checkboxes" className="grid grid-cols-2 gap-2 text-xs">
          {Object.keys(input.backendStack).map((key) => {
            const label = key === "express" ? "Express.js" :
                          key === "nestjs" ? "NestJS" :
                          key === "fastapi" ? "FastAPI py" :
                          key === "laravel" ? "Laravel PHP" :
                          key === "django" ? "Django" :
                          key === "springBoot" ? "Spring Boot" :
                          key === "goLang" ? "Go (Golang)" :
                          key === "rubyOnRails" ? "Ruby on Rails" :
                          key === "flask" ? "Flask Python" :
                          key === "aspNetCore" ? "ASP.NET Core (.NET)" :
                          key === "elixirPhoenix" ? "Elixir Phoenix" :
                          key === "sqlite" ? "SQLite Db" :
                          key === "postgresql" ? "PostgreSQL" :
                          key === "mongodb" ? "MongoDB" :
                          key === "mysql" ? "MySQL Database" :
                          key === "redis" ? "Redis Cache" :
                          key === "supabase" ? "Supabase BaaS" :
                          key === "firebase" ? "Firebase Suite" :
                          key === "prisma" ? "Prisma ORM" :
                          key === "graphql" ? "GraphQL API" :
                          key === "trpc" ? "tRPC Typesafe API" :
                          key === "socketIo" ? "Socket.io WebSockets" :
                          key === "docker" ? "Docker Container" :
                          key === "kubernetes" ? "Kubernetes Orchestration" : key;
            const active = input.backendStack[key as keyof ProjectInput["backendStack"]];
            return (
              <button
                key={key}
                type="button"
                id={`btn-back-${key}`}
                onClick={() => toggleBackend(key as keyof ProjectInput["backendStack"])}
                className={`flex items-center gap-2.5 px-3 py-2 border rounded-xl font-medium text-left transition-all ${
                  active
                    ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-300"
                    : "bg-slate-950 border-slate-800/60 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${active ? "border-indigo-400 bg-indigo-500" : "border-slate-700 bg-slate-950"}`}>
                  {active && <div className="w-1.5 h-1.5 bg-white rounded-full animate-scale-up" />}
                </div>
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hosting / Deployment Providers */}
      <div id="hosting-section" className="border-t border-slate-800/80 pt-5">
        <div id="hosting-header" className="flex items-center gap-2 mb-3">
          <Cloud className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Pilihan Hosting / Cloud Deployment</h3>
        </div>
        <div id="hosting-checkboxes" className="grid grid-cols-2 gap-2 text-xs">
          {Object.keys(input.hosting).map((key) => {
            const label = key === "vercel" ? "Vercel" :
                          key === "netlify" ? "Netlify" :
                          key === "railway" ? "Railway" :
                          key === "render" ? "Render" :
                          key === "heroku" ? "Heroku" :
                          key === "aws" ? "Amazon Web Services" :
                          key === "gcp" ? "Google Cloud (GCP)" :
                          key === "azure" ? "Microsoft Azure" :
                          key === "digitalOcean" ? "DigitalOcean" :
                          key === "firebaseHosting" ? "Firebase Hosting" :
                          key === "githubPages" ? "GitHub Pages" :
                          key === "cloudflarePages" ? "Cloudflare Pages" :
                          key === "flyIo" ? "Fly.io Application Edge" : key;
            const active = input.hosting[key as keyof ProjectInput["hosting"]];
            return (
              <button
                key={key}
                type="button"
                id={`btn-host-${key}`}
                onClick={() => toggleHosting(key as keyof ProjectInput["hosting"])}
                className={`flex items-center gap-2.5 px-3 py-2 border rounded-xl font-medium text-left transition-all ${
                  active
                    ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-300"
                    : "bg-slate-950 border-slate-800/60 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${active ? "border-indigo-400 bg-indigo-500" : "border-slate-700 bg-slate-950"}`}>
                  {active && <div className="w-1.5 h-1.5 bg-white rounded-full animate-scale-up" />}
                </div>
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* External System / API */}
      <div id="external-api-section" className="border-t border-slate-800/80 pt-5">
        <div id="external-header" className="flex items-center gap-2 mb-3">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Sistem Eksternal & API</h3>
        </div>
        <div id="external-checkboxes" className="grid grid-cols-2 gap-2 text-xs">
          {Object.keys(input.externalSystems).map((key) => {
            const label = key === "camera" ? "Kamera" :
                          key === "microphone" ? "Mikrofon (Sound/Voice)" :
                          key === "printerThermal" ? "Printer Thermal (POS)" :
                          key === "gpsGeolocation" ? "GPS / Geolocation" :
                          key === "googleMapsApi" ? "Google Maps API" :
                          key === "geminiAi" ? "Gemini AI API" :
                          key === "stripePayment" ? "Stripe Payments" :
                          key === "firebaseAuth" ? "Firebase Auth" :
                          key === "oauth2" ? "OAuth 2.0 (Google/GitHub)" : key;
            const active = input.externalSystems[key as keyof ProjectInput["externalSystems"]];
            return (
              <button
                key={key}
                type="button"
                id={`btn-ext-${key}`}
                onClick={() => toggleExternal(key as keyof ProjectInput["externalSystems"])}
                className={`flex items-center gap-2.5 px-3 py-2 border rounded-xl font-medium text-left transition-all ${
                  active
                    ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-300"
                    : "bg-slate-950 border-slate-800/60 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${active ? "border-indigo-400 bg-indigo-500" : "border-slate-700 bg-slate-950"}`}>
                  {active && <div className="w-1.5 h-1.5 bg-white rounded-full animate-scale-up" />}
                </div>
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Key / Config Inputs for Selected External Systems */}
        {Object.entries(input.externalSystems).some(([_, active]) => active) && (
          <div id="external-keys-inputs" className="mt-3.5 p-3.5 bg-slate-950/80 border border-slate-800/60 rounded-xl space-y-3.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400 block mb-0.5">Konfigurasi API / Spesifikasi Hardware Kunci</span>
            {Object.entries(input.externalSystems).map(([key, active]) => {
              if (!active) return null;
              const label = key === "camera" ? "Kamera" :
                            key === "microphone" ? "Mikrofon (Sound/Voice)" :
                            key === "printerThermal" ? "Printer Thermal (POS)" :
                            key === "gpsGeolocation" ? "GPS / Geolocation" :
                            key === "googleMapsApi" ? "Google Maps API" :
                            key === "geminiAi" ? "Gemini AI API" :
                            key === "stripePayment" ? "Stripe Payments" :
                            key === "firebaseAuth" ? "Firebase Auth" :
                            key === "oauth2" ? "OAuth 2.0 (Google/GitHub)" : key;
              
              const value = input.externalApiKeys?.[key] || "";
              return (
                <div key={key} id={`key-input-wrapper-${key}`} className="space-y-1 max-w-full">
                  <span className="text-[11px] text-slate-400 font-medium block truncate">{label}</span>
                  <input
                    id={`input-key-${key}`}
                    type="text"
                    value={value}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChange((prev) => ({
                        ...prev,
                        externalApiKeys: {
                          ...(prev.externalApiKeys || {}),
                          [key]: val,
                        },
                      }));
                    }}
                    placeholder={`Contoh API Key, Token, atau Spesifikasi Model untuk ${label}...`}
                    className="w-full bg-slate-950 border border-slate-850 text-slate-200 placeholder-slate-700 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Custom notes / prompt specifications */}
      <div id="custom-notes-section" className="border-t border-slate-800/80 pt-5">
        <label id="lbl-custom-notes" className="block">
          <div className="flex items-center gap-2 mb-1.5">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Catatan Khusus Tambahan</span>
          </div>
          <textarea
            id="input-custom-notes"
            name="customNotes"
            rows={3}
            value={input.customNotes}
            onChange={handleTextChange}
            placeholder="Tambahkan arsitektur khusus, file target, atau pola koding spesifik yang wajib dipatuhi..."
            className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
          />
        </label>
      </div>

      {/* CTA Submit Buttons */}
      <div id="cta-section" className="pt-3">
        <button
          type="button"
          id="btn-generate-blueprint"
          disabled={isLoading || !input.projectName.trim() || !input.projectDescription.trim()}
          onClick={onGenerate}
          className="w-full relative flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-40 disabled:pointer-events-none rounded-xl text-white font-medium text-sm transition-all focus:outline-none ring-2 ring-indigo-500/20 active:scale-[0.98]"
        >
          {isLoading ? (
            <>
              <div id="btn-spin" className="w-5 h-5 border-2 border-indigo-200 border-t-transparent rounded-full animate-spin" />
              <span>Menyusun AI Blueprint...</span>
            </>
          ) : (
            <>
              <Sparkles id="btn-sparkle" className="w-4.5 h-4.5 text-indigo-200 animate-pulse" />
              <span>Otomatiskan File README.md</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
