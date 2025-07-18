"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useCreateData } from '@/hooks/useCreateData';
import MachineService from '@/services/MachineService';
import { createMachineValidator } from '@/validators/machineValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type CreateMachineFormData = z.infer<typeof createMachineValidator>;

export default function CreateArea() {
    const { mutate: createMutation, isPending } = useCreateData(
        MachineService.create,
        ["machines"],
        "/machines"
    );

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset
    } = useForm<CreateMachineFormData>({
        resolver: zodResolver(createMachineValidator),
        mode: "onChange",
    });

    const onSubmit = (data: CreateMachineFormData) => {
        createMutation(data, {
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
                    { label: 'Machines', href: '/machines' }, 
                    { label: 'Create' }
                ]} 
            />
            <div className="space-y-6">
                <ComponentCard title="Create Machine">
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
                                disabled={isPending} 
                                loading={isPending}
                            >
                                Create Machine
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    );
}
