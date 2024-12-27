import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

export default function TableHeading({ name, sortable = true, sortField, sortDirection, onSortChanged, children }) {
    return (
        <th
            onClick={e => onSortChanged(name)}
        >
            <div className="px-3 py-2 flex items-center justify-between gap-1 cursor-pointer">
                {children}
                {sortable && (
                  <div>
                    <ChevronUpIcon className={`w-4 ${(sortDirection === 'asc' && sortField === name) ? 'text-white' : ''}`} />
                    <ChevronDownIcon className={`w-4 ${(sortDirection === 'desc' && sortField === name) ? 'text-white' : ''}`} />
                  </div>
                )}
            </div>
        </th>
    );
}
