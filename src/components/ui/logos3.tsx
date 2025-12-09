// This template requires the Embla Auto Scroll plugin to be installed:
//
// npm install embla-carousel-auto-scroll

"use client";

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
  heading = "Wir Arbeiten Mit",
  logos = [
    {
      id: "logo-1",
      description: "Partner 1",
      image: "https://www.musikhaus-sieber.com/media/image/30/af/f0/db_logo.jpg",
      className: "h-12 w-auto object-contain",
    },
    {
      id: "logo-2",
      description: "Partner 2",
      image: "",
      className: "h-12 w-auto object-contain",
    },
    {
      id: "logo-3",
      description: "Partner 3",
      image: "https://th.bing.com/th/id/OIP.RoSU7rcQuaiGECX0n-zuIgAAAA?w=224&h=94&c=7&r=0&o=7&pid=1.7&rm=3",
      className: "h-12 w-auto object-contain",
    },
    {
      id: "logo-4",
      description: "Partner 4",
      image: "",
      className: "h-12 w-auto object-contain",
    },
    {
      id: "logo-5",
      description: "Partner 5",
      image: "https://www.icd-usa.com/cdn/shop/files/image003_800x.png?v=1686326971",
      className: "h-12 w-auto object-contain",
    },
    {
      id: "logo-6",
      description: "Partner 6",
      image: "",
      className: "h-12 w-auto object-contain",
    },
    ,
    {
      id: "logo-8",
      description: "Partner 8",
      image: "",
      className: "h-12 w-auto object-contain",
    },
  ],
}: Logos3Props) => {
  return (
    <section className="py-16 bg-white">
      <div className="container flex flex-col items-center text-center">
        <h2 className="my-6 text-2xl font-bold text-pretty lg:text-4xl text-black">
          {heading}
        </h2>
      </div>
      <div className="pt-10 md:pt-16 lg:pt-20">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-10 flex shrink-0 items-center justify-center">
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
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
