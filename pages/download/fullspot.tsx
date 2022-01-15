import { useRouter } from "next/router";
import { useEffect } from "react";

const fullspot = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(
      "https://github.com/ZelrDev/zelr-portfolio/raw/main/public/fullspot-1.0.0-setup.exe"
    );
  }, []);

  return <div>Downloading file</div>;
};

export default fullspot;
