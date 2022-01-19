import Project from "./Project";

const Projects = () => {
  return (
    <div className="text-center bg-gray-50 text-black mx-auto p-5">
      <div>
        <h1 className="text-3xl">Projects</h1>
        <p className="font-mono text-sm">creating apps is fun</p>
      </div>
      <div className="md:flex space-y-10 md:space-y-0 justify-center gap-16 py-10">
        <Project
          href=""
          img="/pringo.png"
          title="Pringo"
          desc="Pringo is a organizer for your projects, it will be open-source once released."
        />
        <Project
          href="http://50.116.41.169/FullSpotSetup.exe"
          img="http://cdn.zelr.me/gimcd.png"
          title="Fullspot"
          desc="Fullscreen your spotify without premium. I will be adding an overlay soon. There are some authentication bugs."
        />
        <Project
          href="https://github.com/ZelrDev/netor"
          img="/netor.png"
          title="Netor"
          desc="Netor was a work in progress discord bot. It used react and MUI. I have halted development on it, however you may fork it and develop it."
        />
      </div>
    </div>
  );
};

export default Projects;
