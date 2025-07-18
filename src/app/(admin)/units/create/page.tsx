"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import UnitService from '@/services/UnitService';
import { createUnitValidator } from '@/validators/unitValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type CreateUnitFormData = z.infer<typeof createUnitValidator>;

export default function CreateUnit() {
    const { mutate: createMutation, isPending } = useCreateData(
        UnitService.create,
        ["units"],
        "/units"
    );

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset
    } = useForm<CreateUnitFormData>({
        resolver: zodResolver(createUnitValidator),
        mode: "onChange",
    });

    const onSubmit = (data: CreateUnitFormData) => {
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
                    { label: 'units', href: '/units' }, 
                    { label: 'Create' }
                ]} 
            />
            <div className="space-y-6">
                <ComponentCard title="Create Unit">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputLabel
                            label="Code"
                            name="code"
                            type="text"
                            required
                            placeholder="Enter Unit code"
                            register={register("code")}
                            error={errors.code}
                        />
                        <InputLabel
                            label="Name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter  unit name"
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
                                disabled={isPending} 
                                loading={isPending}
                            >
                                Create Unit
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
