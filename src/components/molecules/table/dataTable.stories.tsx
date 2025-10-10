import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "./dataTable";

const meta: Meta<typeof DataTable> = {
  title: "Molecules/DataTable",
  component: DataTable,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  args: {
    data: [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ],
    columns: [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
    ],
    isLoading: false,
    error: null,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
    ],
    isLoading: true,
    error: null,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
    ],
    isLoading: false,
    error: null,
    emptyMessage: "No data found.",
  },
};
