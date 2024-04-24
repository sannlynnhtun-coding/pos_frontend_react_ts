import {useNavigate, useParams} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {Inputs} from "@/type/formSchema.ts";
import {productFormConst} from "@/constants/form-constant.ts";
import useRenderForm from "@/hook/useRenderForm.tsx";
import apiClient from "@/services/api/api-client.ts";
import {useUpdateQuery} from "@/hook/management/useUpateQuery.ts";
import {toast} from "@/components/ui/use-toast.ts";


export default function ProductEditForm() {
    const {productId} = useParams();
    const navigate = useNavigate();

    const {mutate: updateForm} = useUpdateQuery<Inputs>("products");


    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({
        defaultValues: async () => {
            const {data} = await apiClient.get(`products/${productId}`);
            console.log(data)
            return data.data.product;
        }
    });
    const formElements = useRenderForm({formconst: productFormConst, errors, register, title: "Product Edit"});

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        updateForm({formData: data, route: "products", id: productId!});
        navigate("../..", {relative: "path"});
        toast({description: "Successfully updated"});
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-4/6 m-auto">
            {formElements}
        </form>
    );
}