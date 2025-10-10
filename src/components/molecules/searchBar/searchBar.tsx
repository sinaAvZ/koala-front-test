"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/atoms";
import { useState, useEffect } from "react";
import { useDebounce } from "@/lib/hooks/useDeounce";

interface SearchBarProps {
  value?: string; // optional initial value
  onChange: (value: string) => void; // debounced callback
  placeholder?: string;
  debounceDelay?: number;
}

export default function SearchBar({
  value = "",
  onChange,
  placeholder = "Search trading pairs...",
  debounceDelay = 500,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState<string>(value);
  const debouncedValue = useDebounce(inputValue, debounceDelay);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
      />
    </div>
  );
}
