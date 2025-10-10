import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Atoms/Skeleton",
  component: Skeleton,
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = { render: () => <Skeleton className="h-4 w-40" /> };
export const Circle: Story = { render: () => <Skeleton className="h-10 w-10 rounded-full" /> };
