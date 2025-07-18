"use client"
import Breadcrumb from '@/components/common/Breadcrumb'
import ComponentCard from '@/components/common/ComponentCard'
import InputLabel from '@/components/form/FormInput';
import Button from '@/components/ui/button/Button';
import { useFetchById } from '@/hooks/useFetchDetailData';
import { useUpdateData } from '@/hooks/useUpdateData';
import OperatorService from '@/services/OperatorService';
import { Operator } from '@/types/operator';
import { operatorUpdateValidation } from '@/validators/operator/operatorUpdate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

const EditOperator = () => {

    const params = useParams();
    const id = params.id;
    type formData = {
        name: string;
        nik: string;
    }
    const { data: operator } = useFetchById<Operator>(OperatorService.getById, Number(id), "operator");
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(operatorUpdateValidation),
    });

    useEffect(() => {
        if (operator) {
            reset({
                name: operator.name,
                nik: operator.nik,
            });
        }
    }, [operator, reset]);

    const { mutate: updateMutation, isPending } = useUpdateData(
        OperatorService.update,
        Number(id),
        "operators",
        "/operators"
    );

    const onSubmit = (data: formData) => {
        updateMutation(data);
    };
    return (
        <div>
            <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Operators', href: '/operators' }, { label: 'Edit' }]} />
            <div className="space-y-6">
                <ComponentCard title="Edit Operator">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputLabel
                            label="Name"
                            name="name"
                            type="text"
                            required
                            placeholder="Enter Name"
                            register={register("name")}
                            error={errors.name}
                        />
                        <InputLabel
                            label="NIK"
                            name="nik"
                            type="text"
                            required
                            placeholder="Enter NIK"
                            register={register("nik")}
                            error={errors.nik}
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
                                Update
                            </Button>
                        </div>
                    </form>
                </ComponentCard>
            </div>
        </div>
    )
}

export default EditOperator
