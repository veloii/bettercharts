import Image from "next/image";
import Link from "next/link";

const Project = (props: {
  title: string;
  desc: string;
  img: string;
  href: string;
}) => {
  return (
    <Link href={props.href}>
      <div className="md:mx-0 mx-auto font-mono text-left w-96 space-y-2 cursor-pointer transition hover:bg-white p-3 hover:border hover:scale-95 rounded-lg">
        <Image
          src={props.img}
          width="384"
          height="216"
          alt={props.title}
          className="rounded-lg w-96 border"
        />
        <div>
          <h2 className="font-semibold text-xl">{props.title}</h2>
          <p className="text-gray-800 text-sm">{props.desc}</p>
        </div>
      </div>
    </Link>
  );
};

export default Project;
