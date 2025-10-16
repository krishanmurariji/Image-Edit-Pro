import { Github, Youtube, Instagram, Twitter, Linkedin, Moon, RotateCw } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com/krishanmurariji", label: "GitHub", color: "#333" },
  { icon: Youtube, href: "https://www.youtube.com/@Decode-And-discover", label: "YouTube", color: "#FF0000" },
  { icon: Instagram, href: "https://www.instagram.com/krishanmurariji/", label: "Instagram", color: "#E4405F" },
  { icon: Twitter, href: "https://twitter.com/KrishanMuraari", label: "Twitter", color: "#1DA1F2" },
  { icon: Linkedin, href: "https://linkedin.com/in/krishan-murari/", label: "LinkedIn", color: "#0077B5" },
];

const Footer = () => {
  return (
    <footer className="relative mt-0 py-8 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl rounded-3xl bg-card/95 backdrop-blur-sm py-6 px-8 shadow-lg border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Section - Logo & Copyright */}
          <div className="flex items-center gap-4">
            <img
              src={`${import.meta.env.BASE_URL}favicon_io/android-chrome-192x192.png`}
              alt="Logo"
              className="w-16 h-16 rounded-full"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/192";
              }}
            />
            <div className="flex flex-col">
              <p className="text-sm text-muted-foreground">
                © 2025 All rights reserved
              </p>
              <p className="font-semibold text-lg bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Krishan Murari
              </p>
            </div>
          </div>

          {/* Center Section - Social Media Icons */}
          <div className="flex gap-4">
            {socials.map((social) => (
              <div key={social.label} className="relative group">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden flex justify-center items-center w-12 h-12 rounded-full bg-background border-2 border-border hover:shadow-lg transition-all duration-300"
                  aria-label={social.label}
                >
                  <div
                    className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 group-hover:h-full"
                    style={{ backgroundColor: social.color }}
                  />
                  <social.icon className="w-5 h-5 text-foreground relative z-10 group-hover:text-white transition-colors duration-300" />
                </a>
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground text-xs px-3 py-1.5 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:-top-12 transition-all duration-300 whitespace-nowrap shadow-md border">
                  {social.label}
                </div>
              </div>
            ))}
          </div>

          {/* Right Section - Keyboard Shortcuts */}
          <div className="hidden md:flex flex-col gap-3">
            <div className="flex items-center gap-3 bg-muted px-4 py-2 rounded-lg border">
              <Moon className="w-4 h-4 text-muted-foreground" />
              <kbd className="font-mono font-semibold text-sm px-2 py-1 rounded border bg-background">
                T
              </kbd>
              <span className="text-sm text-muted-foreground">Toggle</span>
            </div>

            <div className="flex items-center gap-3 bg-muted px-4 py-2 rounded-lg border">
              <RotateCw className="w-4 h-4 text-muted-foreground" />
              <kbd className="font-mono font-semibold text-sm px-2 py-1 rounded border bg-background">
                R
              </kbd>
              <span className="text-sm text-muted-foreground">Refresh</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
