"use client"
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { useParams } from "next/navigation";
import { useFetchById } from "@/hooks/useFetchDetailData";
import Breadcrumb from "@/components/common/Breadcrumb";
import { dateFormat } from "@/utils/dateFormat";
import StockOutService from "@/services/StockOutService";
import { StockOut } from "@/types/stockOut";
import DataTable from "@/components/common/DataTable";
import { StockOutChangeLog } from "@/types/stockOutChangeLog";

export default function Page() {
    const params = useParams();
    const id = params.id;
    const { data: stockOut } = useFetchById<StockOut>(StockOutService.getById, Number(id), "stockOut");

    if (!stockOut) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
    );

    const columns = [
        {
            header: "Date",
            accessorKey: "created_at",
            cell: (item: StockOutChangeLog) => {
                return dateFormat(item.created_at);
            },
        },
        {
            header: "Qty Before",
            accessorKey: "name",
            cell: (item: StockOutChangeLog) => {
                return item.quantity_before;
            },
        },
        {
            header: "Qty After",
            accessorKey: "name",
            cell: (item: StockOutChangeLog) => {
                return item.quantity_after;
            },
        },

    ];


    return (
        <div className="space-y-6">
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Stock Out', href: '/stock-outs' },
                    { label: 'Detail' }
                ]}
            />

            <div className="grid gap-6">
                <ComponentCard title="Stock Out Detail" className="w-full">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Date
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {dateFormat(stockOut?.created_at)}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Code
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {stockOut?.kanban_code}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Quantity
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {stockOut?.quantity}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Operator
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {stockOut?.operator?.name}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Machine Area
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {stockOut?.machine_area?.name}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Machine Code
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {stockOut.machine?.code}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ComponentCard>

                <DataTable
                    title="Stock Out Change Logs"
                    columns={columns}
                    data={stockOut.stock_out_change_logs ? (Array.isArray(stockOut.stock_out_change_logs) ? stockOut.stock_out_change_logs : [stockOut.stock_out_change_logs]) : []}
                />
            </div>
        </div>
    );
}
