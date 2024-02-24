import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface CardRecipeProps {
  img: string;
  recipeTitle: string;
}

const CardRecipe = ({ img, recipeTitle }: CardRecipeProps) => {
  return (
    <Card>
      <CardContent className="w-80 p-0 m-0 h-full rounded">
        <Image
          src={img}
          alt={recipeTitle}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "auto",
          }}
        />
        <div className="bg-primary text-white w-80">{recipeTitle}</div>
      </CardContent>
    </Card>
  );
};

export default CardRecipe;
