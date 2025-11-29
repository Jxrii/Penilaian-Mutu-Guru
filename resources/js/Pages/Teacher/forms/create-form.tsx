import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createFormSchema = z.object({
    name: z.string().min(3).max(191),
    subject: z.string().min(1).max(191),
    class: z.string().min(1).max(191),
    email: z.string().email(),
});

export function CreateForm() {
    const form = useForm<z.infer<typeof createFormSchema>>({
        resolver: zodResolver(createFormSchema),
        defaultValues: {
            name: '',
            subject: '',
            class: '',
            email: '',
        },
    });

    function onSubmit(values: z.infer<typeof createFormSchema>) {
        console.log(values);
    }
}
