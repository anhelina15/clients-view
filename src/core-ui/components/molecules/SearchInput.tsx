import { forwardRef } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { tv } from 'tailwind-variants';

import { Input } from '@/core-ui/components/atoms/Input';
import Button from '@/core-ui/components/atoms/Button';

const searchInputVariants = tv({
  slots: {
    root: 'relative flex items-center w-full group',
    iconWrapper:
      'absolute left-4 flex items-center justify-center pointer-events-none transition-colors z-10',
    icon: 'text-slate-400',
    input:
      'pl-11 pr-4 py-2 text-sm bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-cyan-500 transition-all outline-none text-slate-700 placeholder:text-slate-400 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none',
    clearButton: 'absolute right-2 text-slate-400 hover:text-slate-600',
  },
  variants: {
    hasClearButton: {
      true: {
        input: 'pr-10',
      },
    },
  },
});

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  inputClassName?: string;
  showClearButton?: boolean;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onChange,
      onClear,
      placeholder,
      className,
      inputClassName,
      showClearButton = false,
      ...props
    },
    ref,
  ) => {
    const { root, iconWrapper, icon, input, clearButton } = searchInputVariants({
      hasClearButton: showClearButton,
    });

    const handleClear = () => {
      if (onClear) {
        onClear();

        return;
      }

      onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <div className={root({ class: className })}>
        <div className={iconWrapper()}>
          <SearchIcon className={icon()} size={18} strokeWidth={2.5} />
        </div>

        <Input
          ref={ref}
          type="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={input({ class: inputClassName })}
          {...props}
        />

        {showClearButton && value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className={clearButton()}
            aria-label="Clear search"
            isFullWidth={false}
          >
            <X size={14} />
          </Button>
        )}
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';

export { SearchInput };
