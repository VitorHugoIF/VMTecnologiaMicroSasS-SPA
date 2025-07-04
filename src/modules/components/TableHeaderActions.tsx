import { Button, Input } from '@/components';
import React from 'react';
import { Search } from 'lucide-react';

interface TableHeaderActionsProps {
  title: string;
  search: string;
  setSearch: (value: string) => void;
  onAdd: () => void;
  addLabel: string;
  searchPlaceholder?: string;
  children?: React.ReactNode;
}

export function TableHeaderActions({
  title,
  search,
  setSearch,
  onAdd,
  addLabel,
  searchPlaceholder = 'Buscar...',
  children,
}: TableHeaderActionsProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between w-full px-2 pt-4 pb-2">
      <div className="font-semibold text-lg text-muted-foreground mb-2 sm:mb-0">{title}</div>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-2 sm:items-center">
        <div className="relative w-full sm:w-auto">
          <Input 
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className='pl-8 pr-2 py-1 w-full sm:w-[200px]'
          />
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-4 h-4" />
          </span>
        </div>
        {children}
        <Button onClick={onAdd}>
          {addLabel}
        </Button>
      </div>
    </div>
  );
} 