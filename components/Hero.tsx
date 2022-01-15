import {
  faGithub,
  faDiscord,
  faSpotify,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useRouter } from "next/router";

const Hero = () => {
  const [dialog, setDialog] = React.useState(false);
  const router = useRouter();

  return (
    <div className="waves h-96 text-white text-center flex justify-center items-center">
      <div className="space-y-5">
        <div>
          <h1 className="text-6xl">zelr</h1>
          <p className="font-mono text-sm pt-2">web developer</p>
        </div>
        {dialog && (
          <div className="fixed flex gap-4 justify-center items-center bg-black w-64 p-2 border-2 border-black font-mono top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow text-center">
            <button className="underline" onClick={() => setDialog(false)}>
              close
            </button>
            <strong>zelr#8115</strong>
          </div>
        )}
        <div className="flex gap-3 justify-center items-center text-xl">
          <a onClick={() => router.push("https://github.com/ZelrDev")}>
            <FontAwesomeIcon
              icon={faGithub}
              className="fab fa-github hover:scale-90 transition"
            />
          </a>
          <a onClick={() => setDialog(true)}>
            <FontAwesomeIcon
              icon={faDiscord}
              className="fab fa-discord hover:scale-90 transition"
            />
          </a>

          <a
            onClick={() =>
              router.push(
                "https://open.spotify.com/user/tgz3fqnbvzfyyugps8o7aotvf?si=057068772d8c4f27"
              )
            }
          >
            <FontAwesomeIcon
              icon={faSpotify}
              className="fab fa-spotify hover:scale-90 transition"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
