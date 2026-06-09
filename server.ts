import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper function to capitalize a string
function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Map technical keys to beautifully formatted human labels
const FE_LABELS: Record<string, string> = {
  vite: "Vite Packager",
  react: "React Library",
  typescript: "TypeScript TS",
  tailwind: "Tailwind CSS",
  reactRouter: "React Router",
  vue: "Vue.js Framework",
  nuxt: "Nuxt.js Framework",
  svelte: "Svelte",
  nextjs: "Next.js (React)",
  astro: "Astro Static",
  angular: "Angular Framework",
  solidjs: "SolidJS",
  framerMotion: "Framer Motion",
  reduxState: "Redux Toolkit",
  piniaState: "Pinia State Store",
  shadcnUi: "Shadcn UI Component Layouts",
  zustand: "Zustand State Store",
  tanstackQuery: "TanStack Query",
  sass: "Sass / SCSS",
  bootstrap: "Bootstrap Framework",
  materialUi: "Material UI (MUI)",
  jquery: "jQuery Library",
};

const BE_LABELS: Record<string, string> = {
  express: "Express.js",
  nestjs: "NestJS",
  fastapi: "FastAPI Python",
  laravel: "Laravel PHP",
  django: "Django",
  springBoot: "Spring Boot",
  goLang: "Go (Golang)",
  rubyOnRails: "Ruby on Rails",
  flask: "Flask Python",
  aspNetCore: "ASP.NET Core (.NET)",
  elixirPhoenix: "Elixir Phoenix",
  sqlite: "SQLite Database",
  postgresql: "PostgreSQL",
  mongodb: "MongoDB",
  mysql: "MySQL Database",
  redis: "Redis Cache",
  supabase: "Supabase BaaS",
  firebase: "Firebase Suite",
  prisma: "Prisma ORM",
  graphql: "GraphQL API",
  trpc: "tRPC Typesafe API",
  socketIo: "Socket.io WebSockets",
  docker: "Docker Container",
  kubernetes: "Kubernetes Orchestration",
};

const HOSTING_LABELS: Record<string, string> = {
  vercel: "Vercel",
  netlify: "Netlify",
  railway: "Railway",
  render: "Render",
  heroku: "Heroku",
  aws: "Amazon Web Services (AWS)",
  gcp: "Google Cloud Platform (GCP)",
  azure: "Microsoft Azure",
  digitalOcean: "DigitalOcean",
  firebaseHosting: "Firebase Hosting",
  githubPages: "GitHub Pages",
  cloudflarePages: "Cloudflare Pages",
  flyIo: "Fly.io Application Edge",
};

const PLATFORM_LABELS: Record<string, string> = {
  web: "Web Browser (Responsive Desktop/Mobile)",
  android: "Android App (Capacitor/Native Wrapper)",
  ios: "iOS App (Capacitor/Native Wrapper)",
  windows: "Windows Standalone (Tauri/Electron)",
  mac: "MacOS Standalone (Tauri/Electron)",
  linux: "Linux Desktop Build",
};

const EXTERNAL_LABELS: Record<string, string> = {
  camera: "Hardware Kamera",
  microphone: "Mikrofon (Suara / Voice)",
  printerThermal: "Printer Thermal (POS)",
  gpsGeolocation: "GPS / Geolocation",
  googleMapsApi: "Google Maps API",
  geminiAi: "Gemini AI API SDK",
  stripePayment: "Stripe Online Payments",
  firebaseAuth: "Firebase Authentication",
  oauth2: "OAuth 2.0 Identity Providers (Google/Github)",
};

// Endpoint to generate README.md using our high-fidelity compiler logic (No AI API required)
app.post("/api/generate-readme", (req, res) => {
  try {
    const {
      projectName,
      projectDescription,
      frontendStack,
      backendStack,
      hosting,
      platforms,
      externalSystems,
      externalApiKeys,
      customNotes,
    } = req.body;

    if (!projectName || !projectDescription) {
      return res.status(400).json({ error: "Project name and description are required." });
    }

    // Determine active selections
    const selectedFrontend = Object.entries(frontendStack || {})
      .filter(([_, enabled]) => enabled)
      .map(([key]) => FE_LABELS[key] || capitalize(key));

    const selectedBackend = Object.entries(backendStack || {})
      .filter(([_, enabled]) => enabled)
      .map(([key]) => BE_LABELS[key] || capitalize(key));

    const selectedHosting = Object.entries(hosting || {})
      .filter(([_, enabled]) => enabled)
      .map(([key]) => HOSTING_LABELS[key] || capitalize(key));

    const selectedPlatforms = Object.entries(platforms || {})
      .filter(([_, enabled]) => enabled)
      .map(([key]) => PLATFORM_LABELS[key] || capitalize(key));

    const selectedExternal = Object.entries(externalSystems || {})
      .filter(([_, enabled]) => enabled)
      .map(([key]) => {
        const label = EXTERNAL_LABELS[key] || capitalize(key);
        const userValue = externalApiKeys?.[key] ? ` (Konfigurasi/Key: \`${externalApiKeys[key]}\`)` : "";
        return `${label}${userValue}`;
      });

    // 1. Build Header & Meta Badges
    let markdown = `# ${projectName}\n\n`;
    markdown += `> ${projectDescription}\n\n`;
    markdown += `## 🚀 Meta Informasi Spek Aplikasi & Device\n\n`;
    
    markdown += `| Kategori | Teknologi Terpilih |\n`;
    markdown += `| :--- | :--- |\n`;
    markdown += `| **Platforms Target** | ${selectedPlatforms.join(", ") || "Web Browser (Responsive)"} |\n`;
    markdown += `| **Frontend Stack** | ${selectedFrontend.join(", ") || "Vite + React (Default)"} |\n`;
    markdown += `| **Backend Stack** | ${selectedBackend.join(", ") || "Client-only (No backend server)"} |\n`;
    markdown += `| **Hosting/Cloud** | ${selectedHosting.join(", ") || "Default Serverless"} |\n`;
    if (selectedExternal.length > 0) {
      markdown += `| **Sistem Eksternal / Hardware** | ${selectedExternal.join(", ")} |\n`;
    }
    markdown += `\n---\n\n`;

    // 2. Blueprint Folder / Modular Code File Structure Blueprint
    markdown += `## 📂 Arsitektur Kode dan Desain Struktur Folder\n\n`;
    markdown += `Berikut adalah arsitektur direktori modular yang telah disesuaikan agar bersih, typesafe, dan siap digunakan oleh pengembang:\n\n`;
    markdown += `\`\`\`bash\n`;
    markdown += `${projectName.toLowerCase().replace(/\s+/g, "-")}/\n`;
    
    // Customize directory structure strictly based on choices
    const isNext = frontendStack?.nextjs;
    const isNuxt = frontendStack?.nuxt;
    
    if (isNext) {
      markdown += `├── app/                      # Next.js App Router\n`;
      markdown += `│   ├── layout.tsx            # Root Layout\n`;
      markdown += `│   ├── page.tsx              # Homepage UI\n`;
      markdown += `│   └── api/                  # API Serverless Routes\n`;
    } else if (isNuxt) {
      markdown += `├── pages/                    # Nuxt.js Pages & Routing\n`;
      markdown += `│   └── index.vue             # Index Screen\n`;
      markdown += `├── components/               # Vue Components\n`;
    } else {
      // Default modern SPA src layout
      markdown += `├── src/\n`;
      markdown += `│   ├── components/           # Komponen UI Bersifat Reusable\n`;
      if (frontendStack?.shadcnUi) {
        markdown += `│   │   └── ui/               # Koleksi Komponen Layout Shadcn UI\n`;
      }
      markdown += `│   ├── views/                # Halaman Utama Aplikasi (Pages)\n`;
      markdown += `│   ├── hooks/                # Custom React Hooks & Logic Layer\n`;
      markdown += `│   ├── services/             # Integrasi API & Database Layer (IndexedDB)\n`;
      markdown += `│   ├── types/                # Kontrak Data & Definisi TypeScript (.d.ts)\n`;
      markdown += `│   ├── App.tsx               # Komponen Entri Utama\n`;
      markdown += `│   └── main.tsx              # Starter App Instance\n`;
    }

    if (selectedBackend.length > 0) {
      markdown += `├── server/                    # Backend Stack & Controller Layer\n`;
      if (backendStack?.express) {
        markdown += `│   ├── index.ts              # Entry point server Express\n`;
        markdown += `│   ├── routes/               # API Router Controller\n`;
        markdown += `│   └── db/                   # Database Connection Setup\n`;
      } else if (backendStack?.fastapi) {
        markdown += `│   ├── main.py               # Uvicorn FastAPI Entry\n`;
        markdown += `│   └── routers/              # Controller Endpoint Routing\n`;
      }
    }
    markdown += `├── .env.example              # Distribusi Dummy Environment Key\n`;
    markdown += `├── package.json              # Resolusi Modul & Package Dependencies\n`;
    markdown += `└── README.md                 # Dokumentasi Blueprint ini\n`;
    markdown += `\`\`\`\n\n`;

    // 3. Complete Stack Specifications
    markdown += `## 🛠️ Modul Spesifikasi Arsitektur Stack\n\n`;
    
    markdown += `### 1. Frontend Layer\n`;
    if (selectedFrontend.length > 0) {
      selectedFrontend.forEach((fe) => {
        markdown += `- **${fe}**: Digunakan sebagai pondasi presentation layer yang modern, ringan, dan responsif.\n`;
      });
    } else {
      markdown += `- **Vite + React + TypeScript**: Standard web layout yang dioptimasi secara instan.\n`;
    }

    markdown += `\n### 2. Backend & Database Layer\n`;
    if (selectedBackend.length > 0) {
      selectedBackend.forEach((be) => {
        markdown += `- **${be}**: Mengelola validasi, data integrity, transaksional database, dan server logic secara aman.\n`;
      });
    } else {
      markdown += `- **Client-side Core Only**: Aplikasi ini berjalan sepenuhnya di sisi browser klien (Single Page Application). Data disimpan via IndexedDB / Local Storage.\n`;
    }

    // 4. Hosting, Cloud, and Edge plans
    markdown += `\n### 3. Hosting & Rencana Deployment\n`;
    if (selectedHosting.length > 0) {
      selectedHosting.forEach((host) => {
        markdown += `- **${host}**: Terpilih sebagai hosting provider untuk menjamin kecepatan transit data terbaik.\n`;
      });
    } else {
      markdown += `- **Vercel / Netlify**: Sangat direkomendasikan untuk penyajian file statis yang cepat di CDN global.\n`;
    }

    // 5. External API / Hardware integration instructions with users keys
    if (selectedExternal.length > 0) {
      markdown += `\n## 🔌 Panduan Koneksi Hardware & API Eksternal\n\n`;
      markdown += `Konfigurasi API kunci dan spesifikasi periferal hardware yang dideklarasikan:\n\n`;
      
      Object.entries(externalSystems || {}).forEach(([key, active]) => {
        if (!active) return;
        const label = EXTERNAL_LABELS[key] || capitalize(key);
        const configuredKey = externalApiKeys?.[key] || "BELUM_DIKONFIGURASI";
        
        markdown += `### Integrasi ${label}\n`;
        markdown += `- **Kode/Key Konfigurasi Aktif**: \`${configuredKey}\`\n`;
        markdown += `- **Alur Error Boundary**: Jika terjadi kegagalan deteksi hardware atau autentikasi token API, sistem akan menjalankan fallback alert visual yang gracefully-degrading tanpa menyebabkan crash sistem.\n`;
        markdown += `- **Inisialisasi Dasar Boilerplate**:\n`;
        markdown += `  \`\`\`typescript\n`;
        markdown += `  // Inisialisasi dasar ${label}\n`;
        markdown += `  const configName = "${key.toUpperCase()}_API_KEY";\n`;
        markdown += `  const tokenSecret = "${configuredKey}";\n`;
        markdown += `  console.log(\`Menghubungkan ke ${label} menggunakan token: \${tokenSecret.slice(0, 4)}...\`);\n`;
        markdown += `  \`\`\`\n\n`;
      });
    }

    // 6. Setup & Installation Guide
    markdown += `## ⚙️ Petunjuk Setup & Instalasi Lokal\n\n`;
    markdown += `Lakukan tahapan-tahapan di bawah ini untuk menjalankan workspace di komputer Anda:\n\n`;
    markdown += `1. **Clone repository ini** ke lokal directory.\n`;
    markdown += `2. **Salin file environment template**:\n`;
    markdown += `   \`\`\`bash\n`;
    markdown += `   cp .env.example .env\n`;
    markdown += `   \`\`\`\n`;
    markdown += `3. **Instal seluruh dependencies**:\n`;
    markdown += `   \`\`\`bash\n`;
    markdown += `   npm install\n`;
    markdown += `   \`\`\`\n`;
    markdown += `4. **Jalankan local development server**:\n`;
    markdown += `   \`\`\`bash\n`;
    markdown += `   npm run dev\n`;
    markdown += `   \`\`\`\n\n`;

    // 7. Environment Variables dictionary
    markdown += `### 📄 Definisi File \`.env.example\`\n`;
    markdown += `Pastikan variabel di bawah ini tercantum pada file \`.env\` lokal Anda:\n\n`;
    markdown += `\`\`\`env\n`;
    markdown += `# Konfigurasi Inti Aplikasi\n`;
    markdown += `PORT=3000\n`;
    markdown += `NODE_ENV=development\n\n`;
    if (selectedExternal.length > 0) {
      markdown += `# API Kunci / Token Eksternal Spesifik\n`;
      Object.entries(externalSystems || {}).forEach(([key, active]) => {
        if (!active) return;
        const configuredKey = externalApiKeys?.[key] || "DUMMY_VALUE";
        markdown += `${key.toUpperCase()}_API_KEY=${configuredKey}\n`;
      });
    }
    markdown += `\`\`\`\n\n`;

    // 8. Custom instructions details
    if (customNotes) {
      markdown += `## 📝 Catatan Tambahan Kustom\n\n`;
      markdown += `${customNotes}\n\n`;
    }

    // 9. Guidelines for AI IDE Coding
    markdown += `## 🤖 Panduan untuk AI IDE Vibe Coding\n\n`;
    markdown += `- Tutup/abaikan semua status loading artifisial, dilarang berspekulasi di luar petunjuk teknis.\n`;
    markdown += `- Gunakan TypeScript secara strict dengan melarang deklarasi jenis \`any\` yang tidak stabil.\n`;
    markdown += `- Selalu asumsikan integritas state management didesain secara modular, terisolasi, dan aman.\n\n`;

    // Append literal Indonesian sentence required exactly
    markdown += `(Tolong susun struktur foldernya secara modular dan rapi (pisahkan antara components, views/pages, hooks, dan types untuk TypeScript). Tuliskan semuanya dalam format kode Markdown (.md) yang siap saya salin mentah-mentah)\n`;

    // Return compiled markdown response immediately
    return res.json({
      markdown: markdown,
      insights: {
        suggestedFiles: isNext ? [
          "/app/page.tsx",
          "/app/layout.tsx",
          "/app/globals.css",
        ] : [
          "/src/types.ts",
          "/src/views/Dashboard.tsx",
          "/src/components/FormInput.tsx",
          "/src/db.ts",
        ],
        estimatedComplexity: `${selectedFrontend.length + selectedBackend.length + selectedExternal.length > 8 ? "Tinggi / Kompleks Modular" : "Medium / Standar Terstruktur"}`,
      },
    });
  } catch (error: any) {
    console.error("Generator Error:", error);
    return res.status(500).json({ error: error.message || "Gagal membina blueprint Markdown." });
  }
});

// Serve frontend assets & start the server securely
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const host = "0.0.0.0";
  app.listen(PORT, host, () => {
    console.log(`Server running at http://${host}:${PORT} under process.env.NODE_ENV = ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});

