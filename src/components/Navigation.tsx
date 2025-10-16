import { Upload } from "lucide-react";
import { Button } from "./ui/button";

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Upload className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold leading-none">Image Editor</h1>
              <p className="text-xs text-muted-foreground">Edit with ease</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Features
            </Button>
            <Button variant="ghost" size="sm">
              About
            </Button>
            <Button variant="default" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
