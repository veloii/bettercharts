import { UserContext } from "context/ClassChartsContext";
import { SocketContext } from "context/SocketIOContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";

const logout = () => {
  const { setSocket } = useContext(SocketContext);
  const { setUser } = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies([
    "cc_access_code",
    "cc_date_of_birth",
  ]);
  const router = useRouter();

  useEffect(() => {
    removeCookie("cc_access_code");
    removeCookie("cc_date_of_birth");

    setUser(undefined);
    setSocket(null);
    router.push("/login");
  }, []);

  return (<div>
          <Head>
        <title>Logging out | BetterCharts</title>
      </Head>
  </div>);
};

export default logout;
