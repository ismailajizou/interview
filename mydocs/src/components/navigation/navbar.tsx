import { logout, selectUser } from "@/redux/features/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "../ui/navigation-menu";

const Navbar = () => {
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <header className="container mx-auto flex items-center justify-between py-4 border-b">
      <h1 className="text-lg font-bold">APPLICATION</h1>
      <nav>
        <NavigationMenu>
          <NavigationMenuList className="gap-4 font-semibold">
            <NavigationMenuItem>
              <Link to={"/"}>Home</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to={"/"}>Documents</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to={"/"}>Documentation</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback>
                {user?.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-center">
              <p>{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={logOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
export default Navbar;
