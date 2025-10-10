import type { Meta, StoryObj } from "@storybook/react";
import EmptySearchState from "./emptySearchState";

const meta: Meta<typeof EmptySearchState> = {
  title: "Molecules/EmptySearchState",
  component: EmptySearchState,
  args: {
    search: "ETHUSDT",
  },
};

export default meta;

type Story = StoryObj<typeof EmptySearchState>;

export const Default: Story = {};
