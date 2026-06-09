import React, { useState, useEffect } from "react";
import { ProjectInput, ReadmeItem, FrontendStackConfig, BackendStackConfig, HostingConfig } from "./types";
import { saveReadme, getAllReadmes, deleteReadme } from "./db";
import Header from "./components/Header";
import FormInput from "./components/FormInput";
import SidebarHistory from "./components/SidebarHistory";
import MarkdownViewer from "./components/MarkdownViewer";
import Toast from "./components/Toast";
import { Sparkles, Compass, Cpu, Layers, HelpCircle, RefreshCw } from "lucide-react";

const INITIAL_FRONTEND_STACK: FrontendStackConfig = {
  vite: true,
  react: true,
  typescript: true,
  tailwind: true,
  reactRouter: true,
  vue: false,
  nuxt: false,
  svelte: false,
  nextjs: false,
  astro: false,
  angular: false,
  solidjs: false,
  framerMotion: false,
  reduxState: false,
  piniaState: false,
  shadcnUi: false,
  zustand: false,
  tanstackQuery: false,
  sass: false,
  bootstrap: false,
  materialUi: false,
  jquery: false,
};

const INITIAL_BACKEND_STACK: BackendStackConfig = {
  express: false,
  nestjs: false,
  fastapi: false,
  laravel: false,
  django: false,
  springBoot: false,
  goLang: false,
  rubyOnRails: false,
  flask: false,
  aspNetCore: false,
  elixirPhoenix: false,
  sqlite: false,
  postgresql: false,
  mongodb: false,
  mysql: false,
  redis: false,
  supabase: false,
  firebase: false,
  prisma: false,
  graphql: false,
  trpc: false,
  socketIo: false,
  docker: false,
  kubernetes: false,
};

const INITIAL_HOSTING: HostingConfig = {
  vercel: false,
  netlify: false,
  railway: false,
  render: false,
  heroku: false,
  aws: false,
  gcp: false,
  azure: false,
  digitalOcean: false,
  firebaseHosting: false,
  githubPages: false,
  cloudflarePages: false,
  flyIo: false,
};

const INITIAL_PLATFORMS = {
  web: true,
  androidCapacitor: false,
  androidReactNative: false,
  windowsTauri: false,
  windowsElectron: false,
  iosCapacitor: false,
};

const INITIAL_EXTERNAL_SYSTEMS = {
  camera: false,
  microphone: false,
  printerThermal: false,
  gpsGeolocation: false,
  googleMapsApi: false,
  geminiAi: false,
  stripePayment: false,
  firebaseAuth: false,
  oauth2: false,
};

const INITIAL_INPUT: ProjectInput = {
  projectName: "",
  projectDescription: "",
  frontendStack: INITIAL_FRONTEND_STACK,
  backendStack: INITIAL_BACKEND_STACK,
  hosting: INITIAL_HOSTING,
  platforms: INITIAL_PLATFORMS,
  externalSystems: INITIAL_EXTERNAL_SYSTEMS,
  externalApiKeys: {},
  customNotes: "",
};

export default function App() {
  const [input, setInput] = useState<ProjectInput>(INITIAL_INPUT);
  const [historyItems, setHistoryItems] = useState<ReadmeItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [generatedMarkdown, setGeneratedMarkdown] = useState<string>("");
  const [insights, setInsights] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Toast notifications management
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Load history from IndexedDB on startup
  useEffect(() => {
    async function loadData() {
      try {
        const items = await getAllReadmes();
        setHistoryItems(items);
      } catch (err) {
        console.error(err);
        showToast("Gagal memuat riwayat offline dari SQLite/IndexedDB", "error");
      }
    }
    loadData();
  }, []);

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type });
  };

  const handleNewProject = () => {
    setInput(INITIAL_INPUT);
    setSelectedId(null);
    setGeneratedMarkdown("");
    setInsights(undefined);
    showToast("Formulir telah di-reset untuk proyek baru.", "info");
  };

  // Generate the markdown document using the server model proxy endpoint
  const handleGenerate = async () => {
    if (!input.projectName.trim() || !input.projectDescription.trim()) {
      showToast("Nama Proyek & Deskripsi adalah kolom wajib.", "error");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/generate-readme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Gagal menghubungi modul server blueprint");
      }

      const data = await res.json();
      setGeneratedMarkdown(data.markdown);
      setInsights(data.insights);

      // Save to IndexedDB persistence layer
      const newItem: ReadmeItem = {
        id: selectedId || crypto.randomUUID(),
        projectName: input.projectName,
        projectDescription: input.projectDescription,
        frontendStack: input.frontendStack,
        backendStack: input.backendStack,
        hosting: input.hosting,
        platforms: input.platforms,
        externalSystems: input.externalSystems,
        externalApiKeys: input.externalApiKeys || {},
        customNotes: input.customNotes,
        generatedMarkdown: data.markdown,
        insights: data.insights,
        timestamp: new Date().toISOString(),
      };

      await saveReadme(newItem);
      setSelectedId(newItem.id);

      // Reload list
      const updatedList = await getAllReadmes();
      setHistoryItems(updatedList);

      showToast("README.md berhasil di-generate secara optimal!", "success");
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Gagal menyusun panduan arsitektur", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistoryItem = (item: ReadmeItem) => {
    setSelectedId(item.id);
    setInput({
      projectName: item.projectName,
      projectDescription: item.projectDescription,
      frontendStack: { ...INITIAL_FRONTEND_STACK, ...item.frontendStack },
      backendStack: { ...INITIAL_BACKEND_STACK, ...item.backendStack },
      hosting: { ...INITIAL_HOSTING, ...item.hosting },
      platforms: { ...INITIAL_PLATFORMS, ...item.platforms },
      externalSystems: { ...INITIAL_EXTERNAL_SYSTEMS, ...item.externalSystems },
      externalApiKeys: item.externalApiKeys || {},
      customNotes: item.customNotes,
    });
    setGeneratedMarkdown(item.generatedMarkdown);
    setInsights(item.insights);
    showToast(`Histori "${item.projectName}" dimuat.`, "info");
  };

  const handleDeleteHistoryItem = async (id: string) => {
    try {
      await deleteReadme(id);
      setHistoryItems((prev) => prev.filter((item) => item.id !== id));
      if (selectedId === id) {
        handleNewProject();
      }
      showToast("Histori proyek berhasil dihapus.", "success");
    } catch (err) {
      showToast("Gagal menghapus entri histori.", "error");
    }
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-white">
      {/* Visual background subtle glows */}
      <div id="bg-glow-top-left" className="absolute top-0 left-1/4 w-[40rem] h-[30rem] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div id="bg-glow-top-right" className="absolute top-10 right-10 w-[30rem] h-[30rem] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Persistent global header */}
      <Header />

      {/* Main Multi-Column Workspace View */}
      <main id="main-workspacegrid" className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Left Column: Local Configurations history list (Col-span-3) */}
        <section id="sidebar-container-col" className="lg:col-span-3">
          <SidebarHistory
            items={historyItems}
            selectedId={selectedId}
            onSelect={handleSelectHistoryItem}
            onDelete={handleDeleteHistoryItem}
            onNewProject={handleNewProject}
          />
        </section>

        {/* Center Column: Parameter & Tech Checklist options (Col-span-4) */}
        <section id="form-container-col" className="lg:col-span-4">
          <FormInput
            input={input}
            onChange={setInput}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        </section>

        {/* Right Column: Dynamic Document code viewing and blueprints (Col-span-5) */}
        <section id="viewer-container-col" className="lg:col-span-5">
          <MarkdownViewer
            markdown={generatedMarkdown}
            insights={insights}
            projectName={input.projectName}
            onCopySuccess={() => showToast("Kode README.md disalin ke papan klip!", "success")}
          />
        </section>

      </main>

      {/* Simple Footer details */}
      <footer id="global-footer" className="text-center py-4 text-[10px] text-slate-500 font-mono tracking-wider border-t border-slate-900 mt-6 shrink-0 bg-slate-950/40">
        <div>
          <span>Blueprint Generator &copy; 2026 &bull; Optimal untuk Vibe Coding di VS Code, Cursor, Windsurf</span>
        </div>
      </footer>

      {/* Active Toast Alert element overlays */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
