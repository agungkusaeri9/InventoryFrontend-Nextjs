"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard';
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import UnitService from '@/services/UnitService';
import { Unit } from '@/types/unit';
import { updateUnitValidator } from '@/validators/unitValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type UpdateUnitFormData = z.infer<typeof updateUnitValidator>;

export default function EditUnit() {
    const params = useParams();
    const id = Number(params.id);
    
    const { data: unit, isLoading } = useFetchById<Unit>(UnitService.getById, id, "unit");
    const { mutate: updateMutation, isPending } = useUpdateData(
        UnitService.update, 
        id, 
        "units", 
        "/units"
    );

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        reset 
    } = useForm<UpdateUnitFormData>({
        resolver: zodResolver(updateUnitValidator),
        mode: "onChange",
    });

    useEffect(() => {
        if (unit) {
            reset({
                code: unit.code,
                name: unit.name
            });
        }
    }, [unit, reset]);

    const onSubmit = (data: UpdateUnitFormData) => {
        updateMutation(data);
    };

    return (
        <div>
            <Breadcrumb 
                items={[
                    { label: 'Dashboard', href: '/dashboard' }, 
                    { label: 'units', href: '/units' }, 
                    { label: 'Edit' }
                ]} 
            />
            <div className="space-y-6">
                <ComponentCard title="Edit Unit">
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
                                Update Unit
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
