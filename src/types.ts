export interface FrontendStackConfig {
  vite: boolean;
  react: boolean;
  typescript: boolean;
  tailwind: boolean;
  reactRouter: boolean;
  vue: boolean;
  nuxt: boolean;
  svelte: boolean;
  nextjs: boolean;
  astro: boolean;
  angular: boolean;
  solidjs: boolean;
  framerMotion: boolean;
  reduxState: boolean;
  piniaState: boolean;
  shadcnUi: boolean;
  zustand: boolean;
  tanstackQuery: boolean;
  sass: boolean;
  bootstrap: boolean;
  materialUi: boolean;
  jquery: boolean;
}

export interface BackendStackConfig {
  express: boolean;
  nestjs: boolean;
  fastapi: boolean;
  laravel: boolean;
  django: boolean;
  springBoot: boolean;
  goLang: boolean;
  rubyOnRails: boolean;
  flask: boolean;
  aspNetCore: boolean;
  elixirPhoenix: boolean;
  sqlite: boolean;
  postgresql: boolean;
  mongodb: boolean;
  mysql: boolean;
  redis: boolean;
  supabase: boolean;
  firebase: boolean;
  prisma: boolean;
  graphql: boolean;
  trpc: boolean;
  socketIo: boolean;
  docker: boolean;
  kubernetes: boolean;
}

export interface HostingConfig {
  vercel: boolean;
  netlify: boolean;
  railway: boolean;
  render: boolean;
  heroku: boolean;
  aws: boolean;
  gcp: boolean;
  azure: boolean;
  digitalOcean: boolean;
  firebaseHosting: boolean;
  githubPages: boolean;
  cloudflarePages: boolean;
  flyIo: boolean;
}

export interface PlatformConfig {
  web: boolean;
  androidCapacitor: boolean;
  androidReactNative: boolean;
  windowsTauri: boolean;
  windowsElectron: boolean;
  iosCapacitor: boolean;
}

export interface ExternalSystemConfig {
  camera: boolean;
  microphone: boolean;
  printerThermal: boolean;
  gpsGeolocation: boolean;
  googleMapsApi: boolean;
  geminiAi: boolean;
  stripePayment: boolean;
  firebaseAuth: boolean;
  oauth2: boolean;
}

export interface ProjectInput {
  projectName: string;
  projectDescription: string;
  frontendStack: FrontendStackConfig;
  backendStack: BackendStackConfig;
  hosting: HostingConfig;
  platforms: PlatformConfig;
  externalSystems: ExternalSystemConfig;
  externalApiKeys: Record<string, string>;
  customNotes: string;
}

export interface GeneratedInsight {
  suggestedFiles: string[];
  estimatedComplexity: string;
}

export interface ReadmeItem {
  id: string;
  projectName: string;
  projectDescription: string;
  frontendStack: FrontendStackConfig;
  backendStack: BackendStackConfig;
  hosting: HostingConfig;
  platforms: PlatformConfig;
  externalSystems: ExternalSystemConfig;
  externalApiKeys: Record<string, string>;
  customNotes: string;
  generatedMarkdown: string;
  insights?: GeneratedInsight;
  timestamp: string;
}
