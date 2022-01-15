import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faGithub,
  faSpotify,
} from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";

const About = () => {
  const router = useRouter();
  const [dialog, setDialog] = React.useState(false);

  return (
    <div className="bg-white">
      {dialog && (
        <div className="fixed flex gap-4 justify-center items-center bg-gray-50 w-64 p-2 border-2 border-black font-mono top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow text-center">
          <button className="underline" onClick={() => setDialog(false)}>
            close
          </button>
          <strong>zelr#8115</strong>
        </div>
      )}
      <div className="p-10 text-center text-black">
        <div className="space-y-3 pb-5">
          <h1 className="text-3xl">About</h1>
          <p className="font-mono text-sm">uh hello this is me</p>
        </div>
        <div className="md:flex justify-center items-center gap-20 py-6">
          <p className="max-w-2xl font-mono">
            I&apos;m a React Developer, trying to find cool applications to
            create. I like designing in figma and I am experienced in Photoshop,
            After Effects, and Premiere Pro. I&apos;m learning C++ and C#, and I
            create fun automation applications in Python.
          </p>
          <img className="md:mx-0 mx-auto py-4" src="/wave.svg" width={160} height={160} alt="Wave Emoji" />
        </div>
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

export default About;
