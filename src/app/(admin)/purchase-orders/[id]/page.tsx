"use client"
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PurchaseOrderService from "@/services/PurchaseOrderService";
import { useParams } from "next/navigation";
import { useFetchById } from "@/hooks/useFetchDetailData";
import Breadcrumb from "@/components/common/Breadcrumb";
import { dateFormat } from "@/utils/dateFormat";
import DataTable from "@/components/common/DataTable";
import { PurchaseOrder } from "@/types/purchaseOrder";

export default function Page() {
    const params = useParams();
    const id = params.id;
    const { data: purchaseOrder } = useFetchById<PurchaseOrder>(PurchaseOrderService.getById, Number(id), "purchase-order");

    if (!purchaseOrder) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
    );

    const columns = [
        {
            header: 'Kanban Code',
            accessorKey: 'kanban_code',
        },
        {
            header: 'Description',
            accessorKey: 'description'
        },
        {
            header: 'Specification',
            accessorKey: 'specification'
        },
        {
            header: 'PR. Number',
            accessorKey: 'pr_number',
        },
        {
            header: 'PR. Requested',
            accessorKey: 'pr_requested',
        },
        {
            header: 'Qty',
            accessorKey: 'quantity'
        },
        {
            header: 'Remark',
            accessorKey: 'remark'
        },
        {
            header: 'Status',
            accessorKey: 'status'
        }
    ];

    return (
        <div className="space-y-6">
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Purchase Order', href: '/purchase-orders' },
                    { label: 'Detail' }
                ]}
            />

            <div className="grid gap-6">
                <ComponentCard title="Purchase Order Detail" className="w-full">
                    <div className="grid md:grid-cols-1 gap-8">
                        <div className="space-y-4">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        PO. Number
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {purchaseOrder?.po_number}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        PO. Date
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {dateFormat(purchaseOrder?.po_date)}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        PR. Date
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {dateFormat(purchaseOrder?.pr_date)}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Supplier
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {purchaseOrder?.supplier?.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ComponentCard>

                <DataTable
                    title="Products"
                    columns={columns}
                    data={purchaseOrder?.purchase_order_details || []}
                />
            </div>
        </div>
    );
}
