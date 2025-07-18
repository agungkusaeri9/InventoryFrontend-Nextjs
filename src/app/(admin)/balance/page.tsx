"use client";
import React, { Suspense, useState } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import KanbanService from "@/services/KanbanService";
import { Kanban } from "@/types/kanban";
import DataTable from "@/components/common/DataTable";
import Loading from "@/components/common/Loading";
import FilterBalance from "@/components/pages/balance/FilterBalance";
import { useFetchDataBalance } from "@/hooks/useFetchDataBalance";

function BalanceList() {
    const [filter, setFilter] = useState({
        machine_id: null as number | null,
        machine_area_id: null as number | null,
        rack_id: null as number | null,
        keyword: "",
        status: null as string | null,
        js_balance_status: ""
    });
    const {
        data: kanbans,
        isLoading,
        setCurrentPage,
        setLimit,
        limit,
        pagination
    } = useFetchDataBalance(KanbanService.get, "kanbans", true, filter);

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Overstock":
                return {
                    text: "text-red-700",
                    bg: "bg-red-100",
                    darkText: "dark:text-red-400",
                    darkBg: "dark:bg-red-800/20",
                };
            case "Understock":
                return {
                    text: "text-yellow-700",
                    bg: "bg-yellow-100",
                    darkText: "dark:text-yellow-400",
                    darkBg: "dark:bg-yellow-800/20",
                };
            case "Normal":
                return {
                    text: "text-green-700",
                    bg: "bg-green-100",
                    darkText: "dark:text-green-400",
                    darkBg: "dark:bg-green-800/20",
                };
            default:
                return {
                    text: "text-slate-600",
                    bg: "bg-slate-100",
                    darkText: "dark:text-slate-300",
                    darkBg: "dark:bg-slate-800/20",
                };
        }
    };

    const renderStatus = (status: string) => {
        const { text, bg, darkText, darkBg } = getStatusStyle(status);

        return (
            <div className={`${text} text-xs text-center w-full ${bg} rounded-md px-2 py-1 ${darkBg} ${darkText} capitalize`}>
                {status || "Uncompleted"}
            </div>
        );
    };


    const columns = [
        // {
        //     header: "#",
        //     accessorKey: "id",
        //     cell: (item: Kanban) => {
        //         const index = kanbans?.findIndex((kanban: Kanban) => kanban.id === item.id) ?? 0;
        //         return index + 1;
        //     },
        // },
        {
            header: "Code",
            accessorKey: "code",
        },
        {
            header: "Rack",
            accessorKey: "rack_code",
            cell: (item: Kanban) => item.rack?.code || '-'
        },
        {
            header: "Description",
            accessorKey: "description",
        },
        {
            header: "Specification",
            accessorKey: "specification",
        },
        {
            header: "Area",
            accessorKey: "machine_area",
            cell: (item: Kanban) => item.machine_area?.name || '-'
        },
        {
            header: "Machine",
            accessorKey: "machine",
            cell: (item: Kanban) => item.machine?.code || '-'
        },

        {
            header: "Min.",
            accessorKey: "min_quantity",
        },
        {
            header: "Max.",
            accessorKey: "max_quantity",
        },
        {
            header: "Ordered Stock",
            accessorKey: "incoming_order_stock",
        },
        {
            header: "Stock In Qty.",
            accessorKey: "stock_in_quantity",
        },
        {

            header: "Balance",
            accessorKey: "balance",
        },
        {
            header: "JS Ending Qty",
            accessorKey: "balance",
            cell: (item: Kanban) => {
                const balance = Number(item.balance);
                const js_ending_quantity = Number(item.js_ending_quantity);
                if (balance !== js_ending_quantity) {
                    return <div className="text-red-700 text-xs text-center w-full bg-red-100 rounded-md px-2 py-1 dark:bg-red-800/20 dark:text-red-400">{js_ending_quantity}</div>;
                } else {
                    return <div className="text-xs text-center w-full rounded-md px-2 py-1 dark:bg-green-800/20 dark:text-green-400">{js_ending_quantity}</div>;
                }
            }
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (item: Kanban) => {
                const status = item.stock_status || "Uncompleted";
                return renderStatus(status);
            }
        }
    ];

    return (
        <div>
            <Breadcrumb items={[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Balance', href: '/balance' }
            ]} />
            <div className="space-y-6">
                <DataTable
                    title="Balance"
                    columns={columns}
                    data={kanbans || []}
                    headerRight={<FilterBalance filter={filter} setFilter={setFilter} />}
                    isLoading={isLoading}
                    pagination={{
                        currentPage: pagination?.curr_page || 1,
                        totalPages: pagination?.total_page || 1,
                        totalItems: pagination?.total || 0,
                        itemsPerPage: limit,
                        onPageChange: setCurrentPage,
                        onLimitChange: setLimit,
                    }}

                />
            </div>
        </div>
    );
}
export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <BalanceList />
        </Suspense>
    );
}
