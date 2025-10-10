import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./card";

const meta: Meta<typeof Card> = {
  title: "Atoms/Card",
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="p-4">
      <div>Card content</div>
    </Card>
  ),
};
