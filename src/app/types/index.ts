import { CarouselSchema } from "@/lib/validator";
import { z } from "zod";
export type ICarousel = z.infer<typeof CarouselSchema>;
