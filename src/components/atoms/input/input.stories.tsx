import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  args: {
    placeholder: "Type here...",
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true, placeholder: "Disabled" } };
