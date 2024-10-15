import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-[#edeef0]">
      <Navbar />
      <div className="h-full mx-auto container flex-grow py-5">{children}</div>
      <Footer />
    </div>
  );
}
