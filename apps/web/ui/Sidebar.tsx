import React, { useContext } from "react";
import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  Text,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { Gauge, MoonStars, Sun } from "tabler-icons-react";
import { UserButton } from "ui/mantine/UserButton";
import { LinksGroup } from "ui/mantine/NavbarLinksGroup";
import { UserContext } from "context/ClassChartsContext";
import { useEffect } from "react";
import { useState } from "react";
import getSidebarFeatures from "lib/getSidebarFeatures";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export function Sidebar() {
  const { classes } = useStyles();
  const [links, setLinks] = useState<any>();
  const { user } = useContext(UserContext);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  useEffect(() => {
    if (links === null) return;
    if (user) setLinks(null);
    if (!user) return;

    const features = [
      { label: "Dashboard", icon: Gauge, link: "/dashboard" },
      { ...getSidebarFeatures(user).student },
      { ...getSidebarFeatures(user).school },
    ];

    const localLinks = features.map((item) => (
      <LinksGroup {...item} key={item.label} />
    ));

    setLinks(localLinks);
  }, [user]);

  return (
    <Navbar
      height="100vh"
      width={{ sm: 300 }}
      px="md"
      pt="md"
      className={classes.navbar}
    >
      <Navbar.Section className={classes.header}>
        <Group position="apart">
          <Text
            sx={(theme) => ({
              fontFamily: "Comfortaa",
              fontSize: theme.fontSizes.xl,
              pointerEvents: "none",
            })}
            color="violet"
          >
            Better Charts
          </Text>
          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <Sun size={18} /> : <MoonStars size={18} />}
          </ActionIcon>
        </Group>
      </Navbar.Section>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
      <Navbar.Section className={classes.footer}>
        <UserButton
          image={user!.student.avatar_url}
          name={user!.student.first_name}
          email={user!.student.last_name}
        />
      </Navbar.Section>
    </Navbar>
  );
}
