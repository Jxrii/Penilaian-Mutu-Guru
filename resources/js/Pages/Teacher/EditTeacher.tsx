import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import TeacherForm from './Partials/TeacherForm';
import { Teacher } from '@/types/models';

interface EditTeacherProps {
    teacher: Teacher,
}

const createFormSchema = z.object({
    name: z.string().min(3).max(191),
    subject: z.string().min(1).max(191),
    class: z.string().min(1).max(191),
    email: z.string().email(),
});

export default function EditTeacher({ teacher }: EditTeacherProps) {
    const form = useForm<z.infer<typeof createFormSchema>>({
        resolver: zodResolver(createFormSchema),
        defaultValues: {
            name: '',
            subject: '',
            class: '',
            email: '',
        },
        values: {...teacher},
    });

    function onSubmit(values: z.infer<typeof createFormSchema>) {
        router.put(route('teacher.update', { teacher: teacher.id }), values);
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tambah Data Guru
                </h2>
            }
        >
            <Head title="Data Guru" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <TeacherForm form={form} onSubmit={onSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
