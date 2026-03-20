import { Badge } from '@/core-ui/components/atoms/Badge';
import { TableCell, TableRow } from '@/core-ui/components/atoms/TablePrimitive';
import { getColor } from '@/shared/utils/colorUtils';
import type { Company } from '@/types/company';
import { STATUS_CONFIG, ROLE_CONFIG } from '@/features/companies/consts/companyStatus';

interface TableRowItemProps {
  company: Company;
  onSelect?: (company: Company) => void;
  selectedId?: number | null;
}

export const TableRowItem = ({ company, onSelect, selectedId }: TableRowItemProps) => {
  const { id, name, state, role, rating, owner, regNumber, primaryAddress, category } = company;

  return (
    <TableRow onClick={() => onSelect?.(company)} selected={selectedId === id} striped>
      <TableCell
        variant="primary"
        className="pl-6 max-w-50 truncate text-black font-normal"
        title={name}
      >
        {name}
      </TableCell>
      <TableCell className="text-sm">
        {(() => {
          const config = state ? STATUS_CONFIG[state] : undefined;

          if (!config) {
            return <span className="text-slate-400">{state}</span>;
          }

          return <span style={{ color: config.color }}>{config.label}</span>;
        })()}
      </TableCell>
      <TableCell className="text-sm text-slate-700">
        {role ? ROLE_CONFIG[role]?.label : undefined}
      </TableCell>
      <TableCell className="text-center">{rating}</TableCell>
      <TableCell className="text-slate-700">{owner?.fullName}</TableCell>
      <TableCell className="tabular-nums">{regNumber}</TableCell>
      <TableCell>{primaryAddress?.address.city}</TableCell>
      <TableCell className="pr-6">
        {(() => {
          if (!category?.value) {
            return null;
          }

          const { bgColor, textColor } = getColor(category.value);

          return (
            <Badge variant="outline" style={{ backgroundColor: bgColor, color: textColor }}>
              {category.value}
            </Badge>
          );
        })()}
      </TableCell>
    </TableRow>
  );
};
