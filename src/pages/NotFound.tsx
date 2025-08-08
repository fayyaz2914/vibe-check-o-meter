import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-6 animate-bounce">😵‍💫</div>
        <h1 className="text-6xl font-bold mb-4 font-fredoka vibe-result">404</h1>
        <p className="text-2xl mb-4 font-comic text-foreground/70">Your vibe led you to a mysterious void!</p>
        <a href="/" className="vibe-button inline-block text-white text-lg px-8 py-4 no-underline">
          Return to Vibe Central ✨
        </a>
      </div>
    </div>
  );
};

export default NotFound;
