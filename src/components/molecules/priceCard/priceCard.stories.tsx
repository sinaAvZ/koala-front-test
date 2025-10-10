import type { Meta, StoryObj } from "@storybook/react";
import PriceCard from "./priceCard";

const meta: Meta<typeof PriceCard> = {
  title: "Molecules/PriceCard",
  component: PriceCard,
  tags: ["autodocs"],
  argTypes: {
    onAddToWatchList: { action: "add to watch list clicked" },
    onRemoveFromWatchList: { action: "remove from watch list clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof PriceCard>;

export const Positive: Story = {
  args: {
    symbol: "BTCUSDT",
    price: "42100.45",
    priceChangePercent: "3.56",
    isInWatchList: false,
    showActions: true,
  },
};

export const Negative: Story = {
  args: {
    symbol: "ETHUSDT",
    price: "3100.99",
    priceChangePercent: "-2.34",
    isInWatchList: false,
    showActions: true,
  },
};

export const InWatchList: Story = {
  args: {
    symbol: "SOLUSDT",
    price: "150.20",
    priceChangePercent: "1.25",
    isInWatchList: true,
    showActions: true,
  },
};

export const WithoutActions: Story = {
  args: {
    symbol: "XRPUSDT",
    price: "0.548",
    priceChangePercent: "0.05",
    showActions: false,
  },
};
