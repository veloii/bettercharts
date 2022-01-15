import { useRouter } from "next/router";
import { useEffect } from "react";

const fullspot = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(
      "https://github.com/ZelrDev/zelr-portfolio/raw/main/public/fullspot-1.0.0-setup.exe"
    );
  }, []);

  return (
    <div className="h-screen w-screen waves">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
        <div className="text-3xl font-mono text-center font-semibold">
          Downloading file
        </div>
        <div className="text-lg font-mono text-center">
          fullspot-1.0.0-setup.exe
        </div>
      </div>
    </div>
  );
};

export default fullspot;
