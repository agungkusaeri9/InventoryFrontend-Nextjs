"use client";
import React, { Suspense } from "react";
import ButtonLink from "@/components/ui/button/ButtonLink";
import Breadcrumb from "@/components/common/Breadcrumb";
import UnitService from "@/services/UnitService";
import { useFetchData } from "@/hooks/useFetchData";
import { useDeleteData } from "@/hooks/useDeleteData";
import { confirmDelete } from "@/utils/confirm";
import Button from "@/components/ui/button/Button";
import DataTable from "@/components/common/DataTable";
import Loading from "@/components/common/Loading";
import { Unit } from "@/types/unit";
import productService from "@/services/product_service";
import { Product } from "@/types/product";
import { formatNumber } from "@/utils/currencyFormat";

function ProductListPage() {
    const {
        data: products,
        isLoading,
        setKeyword,
        setCurrentPage,
        setPageSize,
        pageSize,
        keyword,
        pagination
    } = useFetchData(productService.get, "products");
    const { mutate: remove } = useDeleteData(productService.remove, ["products"]);

    const handleDelete = async (id: number) => {
        const confirmed = await confirmDelete();
        if (confirmed) {
            remove(id);
        }
    };

    const columns = [
        {
            header: "#",
            accessorKey: "id",
            cell: (item: Product) => {
                const index = products?.findIndex((product: Product) => product.id === item.id) ?? 0;
                return index + 1;
            },
        },
        {
            header: "Image",
            accessorKey: "image",
            cell: (item: Product) => (
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded"
                />
            ),
        },
        {
            header: "Code",
            accessorKey: "code",
        },
        {
            header: "name",
            accessorKey: "name",
        },
        {
            header: "Category",
            accessorKey: "category",
            cell: (item: Product) => item.category?.name,
        },
        {
            header: "Unit",
            accessorKey: "unit",
            cell: (item: Product) => item.unit?.name,
        },
        {
            header: "Description",
            accessorKey: "description",
        },
        {
            header: "Price",
            accessorKey: "price",
            cell: (item: Product) => (
                "Rp " + formatNumber(item.price ? parseFloat(item.price) : 0)
            ),
        },
        {
            header: "Stock",
            accessorKey: "stock"
        },

        {
            header: "Action",
            accessorKey: "id",
            cell: (item: Unit) => (
                <div className="flex items-center gap-2">
                    <ButtonLink
                        href={`/products/${item.id}/edit`}
                        variant='info'
                        size='xs'
                    >
                        Edit
                    </ButtonLink>
                    <Button
                        onClick={() => handleDelete(item.id)}
                        variant='danger'
                        size='xs'
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Product', href: '/products' }]} />
            <div className="space-y-6">
                <div className="flex justify-end mb-4">
                    <ButtonLink size='xs' href="/products/create">Create Product</ButtonLink>
                </div>
                <DataTable
                    title="Product List"
                    columns={columns}
                    data={products || []}
                    isLoading={isLoading}
                    pagination={{
                        currentPage: pagination?.pageIndex || 1,
                        totalPages: pagination?.totalPages || 1,
                        totalItems: pagination?.total || 0,
                        itemsPerPage: pageSize,
                        onPageChange: setCurrentPage,
                        onLimitChange: setPageSize,
                    }}
                    search={{
                        value: keyword,
                        onChange: setKeyword,
                        placeholder: "Search Product...",
                    }}
                />
            </div>
        </div>
    );
}
export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <ProductListPage />
        </Suspense>
    );
}
