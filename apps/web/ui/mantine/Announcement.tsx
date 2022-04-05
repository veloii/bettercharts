import React from "react";
import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
  Space,
  Button,
} from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },

  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));

interface CommentHtmlProps {
  postedAt: string;
  body: string;
  author: {
    name: string;
    image: string;
  };
  attachments: {
    filename: string;
    url: string;
}[]
}

export function Announcement({ postedAt, body, author, attachments }: CommentHtmlProps) {
  const { classes } = useStyles();
  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        <Avatar src={author.image} alt={author.name} radius="xl" />
        <div>
          <Text size="sm">{author.name}</Text>
          <Text size="xs" color="dimmed">
            {postedAt}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: body }}
        />
        
      </TypographyStylesProvider>
      <Space h="md" />
      <Group className={classes.body}>
        {attachments?.map((attachment) => (
          <Link passHref href={attachment.url}>
        <Button>{attachment.filename}</Button>
</Link>
        ))}
      </Group>
    </Paper>
  );
}
