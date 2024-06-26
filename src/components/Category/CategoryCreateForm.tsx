import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "@/type/formSchema.ts";
import useRenderForm from "@/hook/useRenderForm.tsx";
import { categoryFormConst } from "@/constants/form-constant.ts";
import { useCreateNew } from "@/hook/management/useAddQuery.ts";
import { toast } from "@/components/ui/use-toast.ts";
// import BackButton from "../BackButton";


export default function CategoryCreateForm() {
    const pathName = "product-categories";
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const formElements = useRenderForm({ formconst: categoryFormConst, errors, register, title: "Create new product category" });
    const { mutateAsync } = useCreateNew(pathName);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await mutateAsync({ formData: data, route: "product-categories" });
        navigate("..", { relative: "path" });
        toast({ description: "✅ Successfully added" });
    };
    return (
        <div className="w-4/6 m-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
                {formElements}
            </form>
        </div>
    );
}