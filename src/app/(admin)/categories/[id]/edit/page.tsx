"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard';
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import CategoryService from '@/services/CategoryService';
import { Category } from '@/types/category';
import { updateCategoryValidator } from '@/validators/category_validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type UpdateCategoryFormData = z.infer<typeof updateCategoryValidator>;

export default function EditCategory() {
    const params = useParams();
    const id = Number(params.id);

    const { data: category, isLoading } = useFetchById<Category>(CategoryService.getById, id, "category");
    const { mutate: updateMutation, isPending } = useUpdateData(
        CategoryService.update,
        id,
        "categories",
        "/categories"
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<UpdateCategoryFormData>({
        resolver: zodResolver(updateCategoryValidator),
        mode: "onChange",
    });

    useEffect(() => {
        if (category) {
            reset({
                code: category.code,
                name: category.name
            });
        }
    }, [category, reset]);

    const onSubmit = (data: UpdateCategoryFormData) => {
        updateMutation(data);
    };

    return (
        <div>
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'categories', href: '/categories' },
                    { label: 'Edit' }
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Edit Category">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputLabel
                            label="Code"
                            name="code"
                            type="text"
                            required
                            placeholder="Enter code"
                            register={register("code")}
                            error={errors.code}
                        />
                        <InputLabel
                            label="Name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter name"
                            register={register("name")}
                            error={errors.name}
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
                                Update Category
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
