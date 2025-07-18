import React from 'react';

interface SkeletonTableProps {
    rows: number;
    columns: number;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({ rows, columns }) => {
    return (
        <div className="overflow-hidden rounded-md  bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-10"></div>
                    <span className="h-9 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-15"></span>
                </div>
                <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-40"></div>
            </div>
            <div className="max-w-full overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-white/[0.05]">
                    <thead className="bg-gray-50 dark:bg-white/[0.02]">
                        <tr>
                            {Array.from({ length: columns }).map((_, index) => (
                                <th key={index} className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-white/[0.05] dark:bg-white/[0.03]">
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                                {Array.from({ length: columns }).map((_, colIndex) => (
                                    <td key={colIndex} className="px-3 py-[5px] text-sm text-gray-500 dark:text-gray-400">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-40"></div>
                <div className="flex items-center justify-end">
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-10"></div>
                        ))}
                    </div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonTable; 