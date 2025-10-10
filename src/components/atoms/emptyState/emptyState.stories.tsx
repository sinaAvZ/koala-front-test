import type { Meta, StoryObj } from "@storybook/react";
import EmptyState from "./emptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Molecules/EmptyState",
  component: EmptyState,
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {};
