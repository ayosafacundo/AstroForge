import {
  Wrench,
  Palette,
  Gift,
} from "lucide-react";
import MainCategoryCard from "./Components/MainCategoryCard";

export default function MainCategories() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <MainCategoryCard title={"Functional"} description={"Solve everyday problems with practical 3D printed solutions"} Icon={<Wrench className="w-6 h-6 text-primary" />} />
          <MainCategoryCard title={"Decorative"} description={"Transform your space with unique artistic pieces"} Icon={<Palette className="w-6 h-6 text-primary" />} />
          <MainCategoryCard title={"Personal"} description={"Create meaningful gifts and custom items"} Icon={<Gift className="w-6 h-6 text-primary" />} />
        </div>
    )
}