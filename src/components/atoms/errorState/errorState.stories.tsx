import type { Meta, StoryObj } from "@storybook/react";
import ErrorState from "./errorState";

const meta: Meta<typeof ErrorState> = {
  title: "Molecules/ErrorState",
  component: ErrorState,
};

export default meta;

type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {};
