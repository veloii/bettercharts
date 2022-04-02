import { Box, Button, Group, Popover, Text, Title } from "@mantine/core";
import { UserContext } from "context/ClassChartsContext";
import { NextPage } from "next";
import Link from "next/link";
import { useContext, useState } from "react";
import { UserInfo } from "ui/mantine/UserInfo";
import { useCookies } from "react-cookie";

const User: NextPage = () => {
  const { user } = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(["cc_access_code"]);
  const [opened, setOpened] = useState(false);

  if (!user) return <div></div>;

  return (
    <>
      <Title order={1} px="md" pt="xl" pb="sm">
        User
      </Title>
      <Box
        sx={(theme) => ({
          padding: theme.spacing.lg,
        })}
      >
        <UserInfo
          avatar={user?.student.avatar_url}
          name={user?.student.name}
          awards={user.awards}
          title="Student"
        />

        <Box mt="xl">
          <Group>
            <Link passHref href="/logout">
              <Button variant="light">Logout</Button>
            </Link>
            <Popover
              opened={opened}
              onClose={() => setOpened(false)}
              target={
                <Button variant="light" onClick={() => setOpened((o) => !o)}>
                  Access Code
                </Button>
              }
              width={260}
              position="bottom"
              withArrow
            >
              <Text
                sx={(theme) => ({
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.colors.gray[9],
                })}
                align="center"
                weight={400}
                size="lg"
              >
                {cookies.cc_access_code}
              </Text>
            </Popover>
          </Group>
        </Box>
      </Box>
    </>
  );
};

export default User;
