"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { bannerData } from "../../shared/banner";
// import { useTranslations } from "next-intl";
// import Autoplay from "embla-carousel-autoplay";

const HomePage = () => {
  // const plugin = React.useRef(
  //   Autoplay({ delay: 3000, stopOnInteraction: true })
  // );

  // const t = useTranslations("Home");
  return (
    <Carousel
      className="w-full mx-auto"
      opts={{
        align: "start",
      }}
      dir="ltr"
      // plugins={[plugin.current]}
      // onMouseEnter={plugin.current.stop}
      // onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {bannerData.map((d, index) => (
          <CarouselItem
            key={index}
            className="relative w-full h-[70vh] md:h-[80vh]"
          >
            <div className="relative w-full h-full">
              <Image
                src={d.image}
                alt="Banner Image"
                fill
                className="object-cover rounded-lg"
                priority
              />
              {/* Optional Overlay & Content */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <h2 className="text-2xl md:text-5xl font-bold mb-4">
                    {d.title}
                  </h2>
                  {d.buttonCaption && (
                    <button className="bg-primary text-white px-6 py-2 rounded-lg shadow-lg hover:bg-opacity-90">
                      {d.buttonCaption}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
};

export default HomePage;
