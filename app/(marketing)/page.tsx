import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { User, currentUser } from "@clerk/nextjs/server";

const Home = async () => {
  const user: User | null = await currentUser();

  if (user) {
    return redirect("/main");
  }

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-y-8 text-center">
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>
      <div className="space-y-3">
        <h1 className="text-4xl font-black uppercase sm:text-5xl md:text-6xl lg:text-7xl">
          todo app
        </h1>
        <p className="sm:text-md text-sm font-semibold text-muted-foreground md:text-lg">
          Create your to-does and stay productive. Become successful. Get better
          grades. Get hired.
        </p>
      </div>

      <Link href="/sign-up">
        <Button className="font-semibold uppercase">get started</Button>
      </Link>
    </div>
  );
};

export default Home;
