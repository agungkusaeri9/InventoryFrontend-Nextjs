"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard';
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import MakerService from '@/services/MakerService';
import { Maker } from '@/types/maker';
import { updateMakerValidator } from '@/validators/makerValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type UpdateMakerFormData = z.infer<typeof updateMakerValidator>;

export default function Page() {
    const params = useParams();
    const id = Number(params.id);
    
    const { data: maker, isLoading } = useFetchById<Maker>(MakerService.getById, id, "maker");
    const { mutate: updateMutation, isPending } = useUpdateData(
        MakerService.update, 
        id, 
        "makers", 
        "/makers"
    );

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        reset 
    } = useForm<UpdateMakerFormData>({
        resolver: zodResolver(updateMakerValidator),
        mode: "onChange",
    });

    useEffect(() => {
        if (maker) {
            reset({
                name: maker.name
            });
        }
    }, [maker, reset]);

    const onSubmit = (data: UpdateMakerFormData) => {
        updateMutation(data);
    };

    return (
        <div>
            <Breadcrumb 
                items={[
                    { label: 'Dashboard', href: '/dashboard' }, 
                    { label: 'makers', href: '/makers' }, 
                    { label: 'Edit' }
                ]} 
            />
            <div className="space-y-6">
                <ComponentCard title="Edit Maker">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputLabel
                            label="Name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter maker name"
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
                                Update Maker
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
