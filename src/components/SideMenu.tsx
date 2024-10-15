import { cn } from "@/lib/utils";
import { Mail, UsersRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function SideMenu() {
  let location = useLocation();

  return (
    <nav className="h-full hidden lg:block rounded-xl border shadow">
      <ul className="text-sm font-medium">
        <li>
          <Link
            to={"/chats"}
            className={cn(
              "flex items-center gap-1 rounded-t-xl p-3 transition-all hover:text-primary hover:bg-muted cursor-pointer",
              {
                "text-primary": location.pathname === "/chats",
              }
            )}
          >
            <Mail size={20} />
            Chats
          </Link>
        </li>
        <li>
          <Link
            to={"/friends"}
            className={cn(
              "flex items-center gap-1 p-3  transition-all hover:text-primary hover:bg-muted cursor-pointer",
              {
                "text-primary": location.pathname === "/friends",
              }
            )}
          >
            <UsersRound size={20} />
            Friends
          </Link>
        </li>
      </ul>
    </nav>
  );
}
