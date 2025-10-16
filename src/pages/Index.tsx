import { ImageEditor } from "@/components/ImageEditor";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1">
        <ImageEditor />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
