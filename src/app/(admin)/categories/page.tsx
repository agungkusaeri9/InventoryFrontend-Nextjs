"use client";
import React, { Suspense } from "react";
import ButtonLink from "@/components/ui/button/ButtonLink";
import Breadcrumb from "@/components/common/Breadcrumb";
import { useFetchData } from "@/hooks/useFetchData";
import { useDeleteData } from "@/hooks/useDeleteData";
import { confirmDelete } from "@/utils/confirm";
import Button from "@/components/ui/button/Button";
import DataTable from "@/components/common/DataTable";
import Loading from "@/components/common/Loading";
import { Unit } from "@/types/unit";
import CategoryService from "@/services/CategoryService";
import { Category } from "@/types/category";

function CategoryListPage() {
    const {
        data: categories,
        isLoading,
        setKeyword,
        setCurrentPage,
        setPageSize,
        pageSize,
        keyword,
        pagination
    } = useFetchData(CategoryService.get, "categories");
    const { mutate: remove } = useDeleteData(CategoryService.remove, ["categories"]);

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
            cell: (item: Category) => {
                const index = categories?.findIndex((category: Category) => category.id === item.id) ?? 0;
                return index + 1;
            },
        },
        {
            header: "Code",
            accessorKey: "code",
        },
        {
            header: "Name",
            accessorKey: "name",
        },
        {
            header: "Action",
            accessorKey: "id",
            cell: (item: Unit) => (
                <div className="flex items-center gap-2">
                    <ButtonLink
                        href={`/categories/${item.id}/edit`}
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
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Category', href: '/categories' }]} />
            <div className="space-y-6">
                <div className="flex justify-end mb-4">
                    <ButtonLink size='xs' href="/categories/create">Create Category</ButtonLink>
                </div>
                <DataTable
                    title="Category List"
                    columns={columns}
                    data={categories || []}
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
                        placeholder: "Search category...",
                    }}
                />
            </div>
        </div>
    );
}
export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <CategoryListPage />
        </Suspense>
    );
}
