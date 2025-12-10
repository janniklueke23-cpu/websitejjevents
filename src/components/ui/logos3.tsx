// This template requires the Embla Auto Scroll plugin to be installed:
//
// npm install embla-carousel-auto-scroll

"use client";

import { useState, useEffect } from "react";
import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  heading = "Unsere Technik",
  logos = [
    {
      id: "logo-1",
      description: "db audiotechnik",
      image: "https://www.musikhaus-sieber.com/media/image/30/af/f0/db_logo.jpg",
      className: "h-6 w-auto object-contain",
    },
    {
      id: "logo-2",
      description: "Shure",
      image: "https://logotypes101.com/logos/367/7A583F17C4424D50C5A48A81D3DF04CF/Shure.png",
      className: "h-28 w-auto object-contain",
    },
    {
      id: "logo-3",
      description: "Robe",
      image: "https://th.bing.com/th/id/OIP.RoSU7rcQuaiGECX0n-zuIgAAAA?w=224&h=94&c=7&r=0&o=7&pid=1.7&rm=3",
      className: "h-10 w-auto object-contain",
    },
    {
      id: "logo-5",
      description: "ICD",
      image: "https://www.icd-usa.com/cdn/shop/files/image003_800x.png?v=1686326971",
      className: "h-10 w-auto object-contain",
    },
    {
      id: "logo-6",
      description: "Clay Paky",
      image: "https://tse1.mm.bing.net/th/id/OIP.TQ_M3Kqbt-orRRLDB6S8mAHaBl?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
      className: "h-8 w-auto object-contain",
    },
    {
      id: "logo-7",
      description: "SGM",
      image: "https://logo.com/image-cdn/images/kts928pd/production/3bb10520d635f2c5f00c3a6d20e21040dc76c0d8-1200x467.png?w=3840&q=72",
      className: "h-4 w-auto object-contain",
    },
    {
      id: "logo-8",
      description: "Allen & Heath",
      image: "https://www.musikhaus-sieber.com/media/image/6e/27/80/allen-and-heath-logo.gif",
      className: "h-6 w-auto object-contain",
    },
    {
      id: "logo-9",
      description: "Behringer",
      image: "https://latestlogo.com/wp-content/uploads/2024/02/behringer-new-logo.png",
      className: "h-6 w-auto object-contain",
    },
  ],
}: Logos3Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto flex flex-col items-center text-center">
          <h2 className="my-6 text-2xl font-bold text-pretty lg:text-4xl text-black">
            {heading}
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto flex flex-col items-center text-center">
        <h2 className="my-6 text-2xl font-bold text-pretty lg:text-4xl text-black">
          {heading}
        </h2>
      </div>
      <div className="pt-10 md:pt-16 lg:pt-20">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true, speed: 1, stopOnInteraction: false })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-16 flex shrink-0 items-center justify-center">
                    <div>
                      <img
                        src={logo.image}
                        alt={logo.description}
                        className={logo.className}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
