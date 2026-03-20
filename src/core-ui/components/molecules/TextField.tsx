import { cn } from '@/shared/utils/cn';
import type { InputProps } from '@/core-ui/components/atoms/Input';
import { Input } from '@/core-ui/components/atoms/Input';
import { Label } from '@/core-ui/components/atoms/Label';

interface TextFieldProps extends Omit<InputProps, 'error'> {
  label?: string;
  error?: string;
  helperText?: string;
  helperTextClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  endAdornment?: React.ReactNode;
}

const TextField = ({
  label,
  id,
  className,
  labelClassName,
  inputClassName,
  error,
  helperText,
  helperTextClassName,
  endAdornment,
  ...inputProps
}: TextFieldProps) => {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <Label htmlFor={id} className={cn(labelClassName)}>
          {label}
        </Label>
      )}
      <div className="relative group/textfield">
        <Input
          id={id}
          error={!!error}
          className={cn(endAdornment && 'pr-12', inputClassName)}
          {...inputProps}
        />
        {endAdornment && (
          <div className="absolute right-0 top-0 bottom-0 rounded-none flex items-center justify-center">
            {endAdornment}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {helperText && (
        <div className={cn('mt-1 space-y-1 text-sm text-slate-500', helperTextClassName)}>
          {helperText}
        </div>
      )}
    </div>
  );
};

export default TextField;
