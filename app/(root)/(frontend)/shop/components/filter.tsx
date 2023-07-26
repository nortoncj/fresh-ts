import { Fauna_One, Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: "400" });
import {Category} from "@/types"

interface FilterProps {
    data: Category[];
}

export const Filter = () => {
    return (
        <section className="collections-filter">
                <div className="collections-filter__title" style={cinzel.style}>Filter By:</div>
                <div className="collections-filter__item" style={cinzel.style}>Sales</div>
                <div className="collections-filter__item" style={cinzel.style}>Categories</div>
                <div className="collections-filter__item" style={cinzel.style}>Colors</div>
                <div className="collections-filter__item" style={cinzel.style}>Custom</div>
            </section>
    )
}

