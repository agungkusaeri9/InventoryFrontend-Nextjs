"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard';
import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import UserService from '@/services/user_service';
import { Unit } from '@/types/unit';
import { User } from '@/types/user';
import { updateUserValidator } from '@/validators/user_validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type UpdateUserFormData = z.infer<typeof updateUserValidator>;

export default function EditUser() {

    const role = ([
        { label: "Admin", value: 0 },
        { label: "Staff", value: 1 },
    ]);

    const params = useParams();
    const id = Number(params.id);

    const { data: user, isLoading } = useFetchById<User>(UserService.getById, id, "user");
    const { mutate: updateMutation, isPending } = useUpdateData(
        UserService.update,
        id,
        "users",
        "/users"
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<UpdateUserFormData>({
        resolver: zodResolver(updateUserValidator),
        mode: "onChange",
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,
                password: ''
            });
        }
    }, [user, reset]);

    const onSubmit = (data: UpdateUserFormData) => {
        updateMutation(data as User);
    };

    return (
        <div>
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'users', href: '/users' },
                    { label: 'Edit' }
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Edit User">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputLabel
                            label="Name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter user name"
                            register={register("name")}
                            error={errors.name}
                        />
                        <InputLabel
                            label="Username"
                            name="username"
                            type="text"
                            required
                            placeholder="Enter username"
                            register={register("username")}
                            error={errors.username}
                        />
                        <InputLabel
                            label="Email"
                            name="email"
                            type="text"
                            required
                            placeholder="Enter email"
                            register={register("email")}
                            error={errors.email}
                        />
                        <SelectLabel
                            label="Role"
                            name="role"
                            register={register("role", { valueAsNumber: true })}
                            options={role}
                            placeholder="Select Role"
                        />

                        <InputLabel
                            label="Password"
                            name="password"
                            type="password"
                            required
                            placeholder="Enter password"
                            register={register("password")}
                            error={errors.password}
                        />
                        <div className="flex justify-end gap-2 mt-6">
                            <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                className="px-4"
                                onClick={() => reset()}
                            >
                                Reset
                            </Button>
                            <Button
                                type="submit"
                                size="sm"
                                variant="primary"
                                className="px-4"
                                disabled={isPending || isLoading}
                                loading={isPending}
                            >
                                Update User
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
