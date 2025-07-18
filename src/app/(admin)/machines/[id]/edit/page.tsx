"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import MachineService from '@/services/MachineService';
import { Machine } from '@/types/machine';
import { updateMachineValidator } from '@/validators/machineValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type UpdateMachineFormData = z.infer<typeof updateMachineValidator>;

export default function Page() {
    const params = useParams();
    const id = Number(params.id);
    
    const { data: machine, isLoading } = useFetchById<Machine>(MachineService.getById, id, "machine");
    const { mutate: updateMutation, isPending } = useUpdateData(
        MachineService.update, 
        id, 
        "machines", 
        "/machines"
    );

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        reset 
    } = useForm<UpdateMachineFormData>({
        resolver: zodResolver(updateMachineValidator),
        mode: "onChange",
    });

    useEffect(() => {
        if (machine) {
            reset({
                code: machine.code
            });
        }
    }, [machine, reset]);

    const onSubmit = (data: UpdateMachineFormData) => {
        updateMutation(data);
    };

    return (
        <div>
            <Breadcrumb 
                items={[
                    { label: 'Dashboard', href: '/dashboard' }, 
                    { label: 'Machines', href: '/machines' }, 
                    { label: 'Edit' }
                ]} 
            />
            <div className="space-y-6">
                <ComponentCard title="Edit machine">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <InputLabel
                            label="Code"
                            name="code"
                            type="text"
                            required
                            placeholder="Enter machine code"
                            register={register("code")}
                            error={errors.code}
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
                                Update machine
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
