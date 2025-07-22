"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import UserService from '@/services/user_service';
import { createUserValidator } from '@/validators/user_validator';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type CreateUserFormData = z.infer<typeof createUserValidator>;

export default function CreateUnit() {
    const role = ([
        { label: "Admin", value: 0 },
        { label: "Staff", value: 1 },
    ]);
    const { mutate: createMutation, isPending } = useCreateData(
        UserService.create,
        ["users"],
        "/users"
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserValidator),
        mode: "onChange",
    });

    const onSubmit = (data: CreateUserFormData) => {
        createMutation(data, {
            onSuccess: () => {
                reset(); // Reset form after successful creation
            }
        });
    };

    return (
        <div>
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'users', href: '/users' },
                    { label: 'Create' }
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Create User">
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
                                disabled={isPending}
                                loading={isPending}
                            >
                                Create User
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
