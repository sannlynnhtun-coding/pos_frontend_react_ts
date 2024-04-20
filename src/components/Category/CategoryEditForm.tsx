import {useNavigate, useParams} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {Inputs} from "@/type/formSchema.ts";
import useRenderForm from "@/hook/useRenderForm.tsx";
import {categoryFormConst} from "@/constants/form-constate.ts";

import {useUpdateQuery} from "@/hook/management/useUpateQuery.ts";
import {useQueryClient} from "@tanstack/react-query";
import {TProductCategory} from "@/type/type.ts";

export default function CategoryEditForm() {
    const navigate = useNavigate();
    const params = useParams();
    const categoryId = params["categoryId"] ?? "";
    const {mutate} = useUpdateQuery("categories");
    //TODO: Refactor this chunk of messy code into custom hook later
    const queryClient= useQueryClient()
    const data : TProductCategory[]  = queryClient.getQueryData(["categories"]) ?? []
    const currentCategory = data.filter(category => category.id.toString() === categoryId)[0]


    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({
        defaultValues : {productCategoryCode: currentCategory.productCategoryCode, productCategoryName: currentCategory.productCategoryName}
    });

    const formElements = useRenderForm({
        formconst: categoryFormConst,
        errors,
        register,
        title: "Product Category Edit"
    });


    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        mutate({formData: data, route: "product-Categories", id: categoryId});
        navigate(`../..`, {relative: "path"});
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-4/6 m-auto">
            {formElements}
        </form>
    );
}