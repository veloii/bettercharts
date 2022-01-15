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
          href="https://github.com/ZelrDev/netor"
          img="/netor.png"
          title="Netor"
          desc="Netor was a work in progress discord bot. It used react and MUI. I have halted development on it, however you may fork it and develop it."
        />
      </div>

      <div className="font-mono text-2xl font-bold pb-5 scale-75">
        <div className="flex justify-center items-center gap-4 p-2">
          <div className="border bg-white p-1 px-2 rounded-lg">cdn.zelr.me</div>
          +
          <div>
            <img className="w-24 rounded-lg border px-2 bg-white" src="https://imgr.search.brave.com/V59OwBAG4YNevr_2ACEfPrpc7pt9BB8SU1E-zupfUDY/fit/900/500/ce/1/aHR0cHM6Ly9sb2dv/dnRvci5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjAvMTAv/dmVyY2VsLWluYy1s/b2dvLXZlY3Rvci5w/bmc" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
