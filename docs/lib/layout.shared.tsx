import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "HytaleJS",
    },
    links: [
      {
        text: "LLMs.txt",
        url: "/llms-full.txt",
      },
    ],
  };
}
