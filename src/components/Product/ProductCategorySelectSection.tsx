import { Badge } from "@/components/ui/badge.tsx";
import ProductCategoryFilter from "./ProductCategoryFilter";

export default function ProductCategorySelectSection() {
    return (
        <div>
            <Badge className={"py-2 px-6 rounded bg-green-500 font-bold text-md"}>Categories</Badge>
            <ProductCategoryFilter />
        </div>
    )
}