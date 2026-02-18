import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Codevault — Premium Source Code Marketplace",
  description:
    "Download premium, production-ready source codes for web, mobile and desktop applications.",
  keywords: ["source code", "premium code", "web development", "mobile apps", "templates"],
  authors: [{ name: "Codevault" }],
  creator: "Codevault",
  openGraph: {
    title: "Codevault — Premium Source Code Marketplace",
    description: "Download premium, production-ready source codes for web, mobile and desktop applications.",
    url: "https://codevault.com",
    siteName: "Codevault",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codevault — Premium Source Code Marketplace",
    description: "Download premium, production-ready source codes for web, mobile and desktop applications.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0f",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body
        className={`
          ${inter.variable} 
          font-sans 
          antialiased 
          bg-[#0a0a0f] 
          text-white 
          selection:bg-yellow-400/20 
          selection:text-yellow-200
          min-h-screen
          flex
          flex-col
          overflow-x-hidden
        `}
      >
        {/* Skip to main content - Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-yellow-400 focus:text-black focus:rounded-lg focus:font-semibold"
        >
          Skip to main content
        </a>

        {/* Background Pattern */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
          
          {/* Gradient Orbs */}
          <div 
            className="absolute top-0 left-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full blur-[120px] sm:blur-[150px] opacity-[0.03]"
            style={{ background: "linear-gradient(135deg, #facc15, #ec4899)" }}
          />
          <div 
            className="absolute bottom-0 right-1/4 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] rounded-full blur-[100px] sm:blur-[130px] opacity-[0.03]"
            style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
          />
        </div>

        {/* Main Layout */}
        <div className="relative flex flex-col min-h-screen">
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main id="main-content" className="flex-grow relative">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </div>

        {/* Scroll to Top Button (Optional - add if needed) */}
        {/* <ScrollToTop /> */}
      </body>
    </html>
  );
}