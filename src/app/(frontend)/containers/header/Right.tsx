import Image from "next/image";
import React from "react";

const Right = () => {
  return (
    <div>
      <Image
        className="rounded bg-blend-multiply cursor-pointer"
        src={process.env.NEXT_PUBLIC_LOGO_URL || ""}
        width={100}
        height={100}
        alt="Luxenest Ecommerce"
      />
    </div>
  );
};

export default Right;
