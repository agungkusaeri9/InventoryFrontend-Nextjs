"use client"
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PurchaseRequestService from "@/services/PurchaseRequestService";
import { useParams } from "next/navigation";
import { useFetchById } from "@/hooks/useFetchDetailData";
import Breadcrumb from "@/components/common/Breadcrumb";
import { dateFormat } from "@/utils/dateFormat";
import { formatNumber } from "@/utils/currencyFormat";
import DataTable from "@/components/common/DataTable";
import { PurchaseRequest } from "@/types/purchaseRequest";

export default function Page() {
    const params = useParams();
    const id = params.id;
    const { data: purchaseRequest } = useFetchById<PurchaseRequest>(PurchaseRequestService.getById, Number(id), "purchase-orderrequests");

    if (!purchaseRequest) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
    );

    const columns = [
        {
            header: 'Item Code',
            accessorKey: 'kanban_code'
        },
        {
            header: 'Item Name',
            accessorKey: 'item_name'
        },
        {
            header: 'Quantity',
            accessorKey: 'quantity'
        },
        {
            header: 'Unit',
            accessorKey: 'unit'
        },
        {
            header: 'Est. Unit Price',
            accessorKey: 'est_unit_price',
            cell: (item: PurchaseRequest) => formatNumber(item.est_unit_price)
        },
        {
            header: 'Est. Amount',
            accessorKey: 'est_amount',
            cell: (item: PurchaseRequest) => formatNumber(item.est_amount)
        },
        {
            header: 'Description',
            accessorKey: 'description_of_goods'
        }
    ];

    const renderExpandedContent = (item: PurchaseRequest) => (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Specification</div>
                <div className="text-sm text-gray-900 dark:text-white">{item.specification || "-"}</div>
            </div>
            <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Part</div>
                <div className="text-sm text-gray-900 dark:text-white">{item.part || "-"}</div>
            </div>
            <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Currency</div>
                <div className="text-sm text-gray-900 dark:text-white">{item.currency || "-"}</div>
            </div>
            <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Required Delivery</div>
                <div className="text-sm text-gray-900 dark:text-white">{dateFormat(item.req_delivery) || "-"}</div>
            </div>
            <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Supplier</div>
                <div className="text-sm text-gray-900 dark:text-white">{item.supplier || "-"}</div>
            </div>
            <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Remark</div>
                <div className="text-sm text-gray-900 dark:text-white">{item.remark || "-"}</div>
            </div>
            <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Purpose</div>
                <div className="text-sm text-gray-900 dark:text-white">{item.purpose || "-"}</div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Purchase Request', href: '/purchase-requests' },
                    { label: 'Detail' }
                ]}
            />

            <div className="grid gap-6">
                <ComponentCard title="Purchase Request Detail" className="w-full">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        PR. Number
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {purchaseRequest?.pr_number}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        PR. Date
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {dateFormat(purchaseRequest.date)}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Budget Number
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {purchaseRequest?.budget_number || "-"}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Type
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {purchaseRequest?.type || "-"}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Department
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {purchaseRequest.department}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Fixed Asset Number
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {purchaseRequest?.fixed_asset_number || "-"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Kind Of Request
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {purchaseRequest?.kind_of_request || "-"}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Requested
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {purchaseRequest?.requested}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Supervisor
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {purchaseRequest?.supervisor || "-"}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Transportation
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {purchaseRequest?.transportation || "-"}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Created
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {dateFormat(purchaseRequest.createdAt)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ComponentCard>

                <DataTable
                    title="Products"
                    columns={columns}
                    data={purchaseRequest?.purchase_request_details || []}
                    expandable={{
                        render: renderExpandedContent
                    }}
                />
            </div>
        </div>
    );
}
