import QuizSettings from "@/components/quiz-settings";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <h1 className="py-2 text-center text-2xl font-bold uppercase tracking-wider text-primary lg:text-4xl">
        Welcome to Educron Quize
      </h1>
      <Separator />
      <div className="grid grid-cols-1 gap-4 p-2 py-3 md:grid-cols-2 md:px-6">
        <div className="relative h-full">
          <Image
            src={"/hero.webp"}
            alt="hero-image"
            priority
            width={450}
            height={450}
            className="mx-auto object-cover object-center"
          />
        </div>
        <QuizSettings />
      </div>
    </div>
  );
}
