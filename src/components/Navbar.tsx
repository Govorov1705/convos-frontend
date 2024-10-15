import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavbar } from "@/hooks/useNavbar";
import { cn } from "@/lib/utils";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { CircleUser, Menu, MessageSquareMore } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const {
    isAuthenticated,
    handleLinkClick,
    isSheetOpen,
    setIsSheetOpen,
    user,
    handleLogout,
  } = useNavbar();

  return (
    <header className="sticky top-0 flex h-12 items-center border-b justify-between px-4 md:px-6 bg-white">
      <div className="mx-auto container flex items-center justify-between gap-4">
        <nav
          className={`${
            isAuthenticated && "hidden"
          } flex-col gap-6 text-lg lg:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6`}
        >
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <MessageSquareMore className="h-6 w-6" />
            <span>Convos</span>
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to="/chats"
                className={cn("text-lg font-medium md:text-base", {
                  "text-primary": location.pathname === "/chats",
                })}
                onClick={handleLinkClick}
              >
                Chats
              </Link>
              <Link
                to="/friends"
                className={cn("text-lg font-medium md:text-base", {
                  "text-primary": location.pathname === "/friends",
                })}
                onClick={handleLinkClick}
              >
                Friends
              </Link>
              <Link
                to="/friend-requests"
                className={cn("text-lg font-medium md:text-base", {
                  "text-primary": location.pathname === "/friend-requests",
                })}
                onClick={handleLinkClick}
              >
                Requests
              </Link>
            </>
          )}
        </nav>
        {isAuthenticated && (
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <DialogTitle className="sr-only">Menu</DialogTitle>
              <DialogDescription className="sr-only">
                Navigation links
              </DialogDescription>
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to="/chats"
                  className={cn(
                    "text-lg font-medium md:text-base hover:text-primary",
                    {
                      "text-foreground": location.pathname === "/chats",
                    }
                  )}
                  onClick={handleLinkClick}
                >
                  Chats
                </Link>
                <Link
                  to="/friends"
                  className={cn("text-lg font-medium md:text-base", {
                    "text-primary": location.pathname === "/friends",
                  })}
                  onClick={handleLinkClick}
                >
                  Friends
                </Link>
                <Link
                  to="/friend-requests"
                  className={cn("text-lg font-medium md:text-base", {
                    "text-primary": location.pathname === "/friend-requests",
                  })}
                  onClick={handleLinkClick}
                >
                  Requests
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        )}
        <div className="flex w-full items-center justify-end gap-4 md:gap-2 lg:gap-4">
          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user?.first_name} {user?.last_name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={"/settings"}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
