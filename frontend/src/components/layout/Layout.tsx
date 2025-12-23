import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  showGrid?: boolean;
}

export const Layout = ({ children, showGrid = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Blueprint grid background */}
      {showGrid && (
        <div className="fixed inset-0 blueprint-grid-lg opacity-50 pointer-events-none grid-fade" />
      )}
      
      {/* Scan line effect */}
      <div className="fixed inset-0 pointer-events-none scanline opacity-30" />
      
      {/* Corner decorations */}
      <div className="fixed top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/30 pointer-events-none" />
      <div className="fixed top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/30 pointer-events-none" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/30 pointer-events-none" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/30 pointer-events-none" />

      <Navbar />
      
      <main className="relative z-10 pt-16">
        {children}
      </main>
    </div>
  );
};
