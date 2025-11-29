import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { User } from '@/types/models';
import { UserRoles } from '@/enums/UserRoles';
import UserForm from './Partials/Form/UserForm';

interface EditUserProps {
    user: User,
}

export const editUserFormSchema = z.object({
    name: z.string().min(3).max(191),
    email: z.string().email(),
    password: z.string().min(6).max(191),
    role: z.nativeEnum(UserRoles),
});

export default function EditUser({ user }: EditUserProps) {
    const form = useForm<z.infer<typeof editUserFormSchema>>({
        resolver: zodResolver(editUserFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            role: UserRoles.SUPERVISOR,
        },
        values: {
            name: user.name,
            email: user.email,
            password: '',
            role: user.role,
        },
    });

    function onSubmit(values: z.infer<typeof editUserFormSchema>) {
        router.put(route('user.update', { user: user.id }), values);
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Data Pengguna
                </h2>
            }
        >
            <Head title="Data Pengguna" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <UserForm form={form} onSubmit={onSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
