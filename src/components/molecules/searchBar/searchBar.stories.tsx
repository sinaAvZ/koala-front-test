import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import SearchBar from "./searchBar";

const meta: Meta<typeof SearchBar> = {
  title: "Molecules/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" },
    value: { control: "text" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    value: "",
    placeholder: "Search trading pairs...",
  },
};

export const WithValue: Story = {
  args: {
    value: "BTCUSDT",
    placeholder: "Search trading pairs...",
  },
};

export const Playground: Story = {
  render: (args) => {
    return <SearchBar {...args} />;
  },
  args: {
    value: "",
    placeholder: "Type to search...",
  },
};
