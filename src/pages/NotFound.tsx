import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="grid min-h-full place-items-center px-6 lg:px-8 py-32">
      <div className="text-center">
        <p className="font-semibold text-primary">404</p>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Page not found
        </h1>
        <p className="mt-5 text-base leading-7 text-muted-foreground">
          Sorry, but it seems that such page doesn&apos;t exist.
        </p>
        <div className="mt-5 flex items-center justify-center">
          <Button>
            <Link to={"/"}>Home page</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
