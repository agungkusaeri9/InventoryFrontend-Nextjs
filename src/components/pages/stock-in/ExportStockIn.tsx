import Button from '@/components/ui/button/Button'
import React from 'react'
import StockInService from '@/services/StockInService'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

const ExportStockIn = ({ filter }: {
    filter: {
        start_date: string,
        end_date: string,
        code: string
    }
}) => {
    const exportMutation = useMutation({
        mutationFn: () => StockInService.exportExcel(
            filter.start_date,
            filter.end_date,
            filter.code
        ),
        onSuccess: (blob) => {
            const url = window.URL.createObjectURL(new Blob([blob], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }));

            const link = document.createElement('a');
            link.href = url;

            let fileName = '';
            if (filter.start_date && filter.end_date) {
                fileName = `stock-in-report-${filter.start_date}-to-${filter.end_date}.xlsx`;
            } else if (filter.start_date) {
                fileName = `stock-in-report-${filter.start_date}.xlsx`;
            } else {
                fileName = 'stock-in-report.xlsx';
            }

            link.setAttribute('download', fileName);

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);
        },
        onError: (error) => {
            console.error('Error exporting to Excel:', error);
            toast.error('Failed to export Excel file');
        }
    });

    const handleExport = () => {
        exportMutation.mutate();
    };

    // if (exportMutation.isPending) {
    //     return <Loading />;
    // }

    return (
        <Button
            onClick={handleExport}
            disabled={exportMutation.isPending}
            size="sm"
            className="flex items-center gap-2 bg-a-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M14 2V8H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8 13L10.5 15.5L16 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            {exportMutation.isPending ? 'Exporting...' : 'Export'}
        </Button>
    )
}

export default ExportStockIn
