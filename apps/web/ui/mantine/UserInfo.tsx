import React from "react";
import { createStyles, Avatar, Text, Group, Box, Tooltip } from "@mantine/core";
import { BadgesResponse } from "classcharts-api/dist/types";
import { Image } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[9],
  },
}));

interface UserInfoIconsProps {
  avatar: string;
  name: string;
  title: string;
  awards: undefined | BadgesResponse;
}

export function UserInfo({ avatar, name, title, awards }: UserInfoIconsProps) {
  const { classes } = useStyles();

  return (
    <div>
      <Group noWrap>
        <Avatar src={avatar} size={94} radius="md" />
        <div>
          <Text
            size="xs"
            sx={{ textTransform: "uppercase" }}
            weight={700}
            color="dimmed"
          >
            {title}
          </Text>

          <Text size="lg" weight={500} className={classes.name}>
            {name}
          </Text>

          <Group noWrap spacing={0}>
            {awards?.map((award) => (
              <Tooltip label={award.name} withArrow key={award.id}>
                <Image style={{ width: 35 }} src={award.icon_url} />
              </Tooltip>
            ))}
          </Group>
        </div>
      </Group>
    </div>
  );
}
