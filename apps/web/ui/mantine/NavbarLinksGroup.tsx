import React, { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
  Tooltip,
} from "@mantine/core";
import {
  Icon as TablerIcon,
  ChevronLeft,
  ChevronRight,
  ExclamationMark,
} from "tabler-icons-react";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "context/ClassChartsContext";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  disabledLink: {
    opacity: "50%",
    pointerEvents: "none",
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

interface LinksGroupProps {
  icon: TablerIcon;
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export function LinksGroup({
  icon: Icon,
  label,
  link,
  initiallyOpened,
  links,
}: LinksGroupProps) {
  const { classes, theme } = useStyles();
  const { user } = useContext(UserContext);

  const hasLinks = Array.isArray(links);

  const [opened, setOpened] = useState(initiallyOpened || false);

  const ChevronIcon = theme.dir === "ltr" ? ChevronRight : ChevronLeft;

  const validate = (label: string) => {
    if (label === "Homework") {
      if (user!.homework.length < 1) return "No Homework Set";
      else return true;
    }
    if (label === "Detentions") {
      if (user!.detentions.length < 1) return "No Detentions Found";
      else return true;
    }
    if (label === "Awards") {
      if (user!.awards.length < 1) return "No Awards Earned";
      else return true;
    }
    if (label === "Announcements") {
      if (user!.announcements.length < 1) return "No Current Announcements";
      else return true;
    }

    return true;
  };

  const items = (hasLinks ? links : []).map((link) =>
    validate(link.label) === true ? (
      <Link key={link.label} passHref href={link.link}>
        <Text<"a"> component="a" className={classes.link} key={link.label}>
          {link.label}
        </Text>
      </Link>
    ) : (
      <Tooltip
        position="right"
        placement="center"
        withArrow
        label={validate(link.label)}
      >
        <Text<"a">
          component="a"
          className={`${classes.link} ${classes.disabledLink}`}
          key={link.label}
        >
          <Group>
            <ThemeIcon variant="light" color="yellow" size="xs">
              <ExclamationMark />
            </ThemeIcon>

            {link.label}
          </Group>
        </Text>
      </Tooltip>
    )
  );

  return (
    <>
      <Link passHref href={link || ""}>
        <UnstyledButton
          onClick={() => setOpened((o) => !o)}
          className={classes.control}
        >
          <Group position="apart" spacing={0}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ThemeIcon variant="light" size={30}>
                <Icon size={18} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            {hasLinks && (
              <ChevronIcon
                className={classes.chevron}
                size={14}
                style={{
                  transform: opened
                    ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                    : "none",
                }}
              />
            )}
          </Group>
        </UnstyledButton>
      </Link>

      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
