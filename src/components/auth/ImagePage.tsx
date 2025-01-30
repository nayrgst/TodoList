import Image from "next/image";
import backgroundImage from "@/public/background.jpg";

export const ImagePage = () => {
  return (
    <section>
      <Image
        src={backgroundImage}
        alt="background da aplicaçao"
        layout="fill"
        objectFit="cover"
        className="rounded-r-lg"
      />
    </section>
  );
};
