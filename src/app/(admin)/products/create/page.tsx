"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import SelectLabel from '@/components/form/FormSelect';
import FormSelect2 from '@/components/form/FormSelect2';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import { useFetchData } from '@/hooks/useFetchData';
import CategoryService from '@/services/CategoryService';
import ProductService from '@/services/product_service';
import UnitService from '@/services/UnitService';
import { Category } from '@/types/category';
import { Unit } from '@/types/unit';
import { createProductValidator } from '@/validators/product_validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type CreateUserFormData = z.infer<typeof createProductValidator>;

export default function CreateUnit() {
    const { data: categories } = useFetchData(CategoryService.get, "categories");
    const { data: units } = useFetchData(UnitService.get, "units");
    const { mutate: createMutation, isPending } = useCreateData(
        ProductService.create,
        ["products"],
        "/products"
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm<CreateUserFormData>({
        resolver: zodResolver(createProductValidator),
        mode: "onChange",
    });

    const onSubmit = (data: z.infer<typeof createProductValidator>) => {
        const formData = new FormData();

        formData.append("code", data.code);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("categoryId", data.categoryId);
        formData.append("unitId", data.unitId);
        formData.append("stock", data.stock.toString());

        if (data.image) {
            formData.append("image", data.image);
        }


        createMutation(formData, {
            onSuccess: () => {
                reset();
            }
        });
    };


    return (
        <div>
            <Breadcrumb
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'products', href: '/products' },
                    { label: 'Create' }
                ]}
            />
            <div className="space-y-6">
                <ComponentCard title="Create Product">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputLabel
                            label="Code"
                            name="code"
                            type="text"
                            required
                            placeholder="Enter product code"
                            register={register("code")}
                            error={errors.code}
                        />
                        <InputLabel
                            label="Name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter product name"
                            register={register("name")}
                            error={errors.name}
                        />

                        {categories && (
                            <FormSelect2
                                label="Category"
                                name="categoryId"
                                control={control}
                                options={categories.map((d: Category) => ({
                                    label: d.name || "",
                                    value: Number(d.id),
                                }))}
                                placeholder="Select Category"
                            />
                        )}

                        {units && (
                            <FormSelect2
                                label="Unit"
                                name="unitId"
                                control={control}
                                options={units.map((d: Unit) => ({
                                    label: d.name || "",
                                    value: Number(d.id),
                                }))}
                                placeholder="Select Unit"
                            />
                        )}

                        <InputLabel
                            label="Description"
                            name="description"
                            type="text"
                            required
                            placeholder="Enter description"
                            register={register("description")}
                            error={errors.description}
                        />

                        <InputLabel
                            label="Price"
                            name="price"
                            type="text"
                            required
                            placeholder="Enter price"
                            register={register("price", {
                                valueAsNumber: true,
                            })}
                            error={errors.price}
                        />

                        <InputLabel
                            label="Stock"
                            name="stock"
                            type="text"
                            required
                            placeholder="Enter stock"
                            register={register("stock", {
                                valueAsNumber: true,
                            })}
                            error={errors.stock}
                        />

                        <InputLabel
                            label="Image URL"
                            name="image"
                            type="file"
                            required
                            placeholder="Enter image URL"
                            register={register("image")}
                            error={errors.image}
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
                                Create Product
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
