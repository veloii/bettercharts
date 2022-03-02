import Head from "next/head";
import Link from "next/link";
import Button from "ui/Button";

const ReportBug = () => {
  return (
    <div className="max-w-xl text-gray-900 dark:text-gray-50">
      <Head>
        <title>Report a bug</title>
      </Head>
      <h1 className="pt-5 text-3xl font-semibold">Reporting a bug</h1>
      <p className="pb-5">
        Currently there is not an in built bug reporting system. Feel free to
        tweet me or faster send me a message on Discord.
      </p>
      <div className="space-y-2">
        <div>
          <Link href="https://zelr.me">
            <Button size="3">Discord </Button>
          </Link>
          <div className="text-xs">
            (click the Discord button on my website)
          </div>
        </div>
        <Link href="https://twitter.com/zelrdev">
          <Button size="3">Twitter</Button>
        </Link>
      </div>
    </div>
  );
};

export default ReportBug;
