import React from 'react';

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '@/core-ui/components/atoms/SelectPrimitive';

interface PageSizeSelectOption {
  value: number;
  label: string;
}

interface PageSizeSelectProps {
  value: number;
  onChange: (value: number) => void;
  options: PageSizeSelectOption[];
}

const PageSizeSelect: React.FC<PageSizeSelectProps> = ({ value, onChange, options }) => {
  return (
    <SelectRoot value={String(value)} onValueChange={(val) => onChange(Number(val))}>
      <SelectTrigger className="h-6 gap-2">
        <span className="text-slate-700 text-sm font-bold">
          <SelectValue placeholder={String(value)} />
        </span>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={String(option.value)}>
            <span className="font-medium">{option.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export default PageSizeSelect;
