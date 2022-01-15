import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import Project from "../components/Project";
import Projects from "../components/Projects";
import Hero from "../components/Hero";
import Image from "next/image";
import About from "../components/About";
import Technologies from "../components/Technologies";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Home | zelr</title>
      </Head>
      <Hero />
      <Projects />
      <Technologies />
      <About />
      <Footer />
    </div>
  );
};

export default Home;
