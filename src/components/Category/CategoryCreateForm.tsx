import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "@/type/formSchema.ts";
import useRenderForm from "@/hook/useRenderForm.tsx";
import { categoryFormConst } from "@/constants/form-constate.ts";
import { useCreateNew } from "@/hook/management/useAddQuery.ts";

export default function CategoryCreateForm() {
    const pathName = "categories"
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const formElements = useRenderForm({ formconst: categoryFormConst, errors, register, title: "Product Category" });
    const { mutate } = useCreateNew(pathName);

    const onSubmit: SubmitHandler<Inputs> = (data) => {

        mutate({ formData: data, route: "product-Categories" })
        navigate("..", { relative: "path" });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-4/6 m-auto">
            {formElements}
        </form>
    )
}