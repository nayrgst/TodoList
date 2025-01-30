"user client";

import { FaUser } from "react-icons/fa";
import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSessionUser } from "@/hooks/useSessionUser";
import { LogoutButton } from "./LogoutButton";

export const UserButton = () => {
  const user = useSessionUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-backSecondari">
            <FaUser size={16} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="rounded-xl ">
        <LogoutButton>
          <DropdownMenuItem className="flex items-center justify-center rounded-xl shadow-md">
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
