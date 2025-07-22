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
import UserService from "@/services/user_service";
import { User } from "@/types/user";

function UserListPage() {
    const {
        data: users,
        isLoading,
        setKeyword,
        setCurrentPage,
        setPageSize,
        pageSize,
        keyword,
        pagination
    } = useFetchData(UserService.get, "users");
    const { mutate: remove } = useDeleteData(UserService.remove, ["users"]);

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
            cell: (item: User) => {
                const index = users?.findIndex((user: User) => user.id === item.id) ?? 0;
                return index + 1;
            },
        },
        {
            header: "Name",
            accessorKey: "name",
        },
        {
            header: "Username",
            accessorKey: "username",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Role",
            accessorKey: "roleName",
        },
        {
            header: "Action",
            accessorKey: "id",
            cell: (item: Unit) => (
                <div className="flex items-center gap-2">
                    <ButtonLink
                        href={`/users/${item.id}/edit`}
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
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'User', href: '/users' }]} />
            <div className="space-y-6">
                <div className="flex justify-end mb-4">
                    <ButtonLink size='xs' href="/users/create">Create User</ButtonLink>
                </div>
                <DataTable
                    title="User List"
                    columns={columns}
                    data={users || []}
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
                        placeholder: "Search user...",
                    }}
                />
            </div>
        </div>
    );
}
export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <UserListPage />
        </Suspense>
    );
}
