import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Header from "./header";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};
