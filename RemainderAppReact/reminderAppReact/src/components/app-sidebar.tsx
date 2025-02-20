import { useContext } from "react"
import {RemainderContext} from '../App'
 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { MoreHorizontal, Pencil, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import axios from "axios";

 
export function AppSidebar() {
const {remainder, setRemainder} = useContext(RemainderContext);

const DeleteRemainder = async (id: number) => {
  try{
    await axios.delete("https://localhost:7234/api/Remainder/" + id).then((res) => {
      setRemainder((prev) => prev.filter((rem) => rem.id !== id));
    });
  }catch(err){
    console.error(err);
  }
}
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Remainders</SidebarGroupLabel>
          <Link to="/create-new">
          <SidebarGroupAction title="Add Remainder">
        <Plus /> <span className="sr-only">Add Remainder</span>
      </SidebarGroupAction>
      </Link>
          <SidebarGroupContent>
            <SidebarMenu>
              {remainder.map((item, index) => (
                <SidebarMenuItem key={index}>
                      <SidebarMenuButton asChild>
    <a>
      <Pencil />
      <span>{item?.name}</span>
    </a>
  </SidebarMenuButton>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <SidebarMenuAction>
        <MoreHorizontal />
      </SidebarMenuAction>
    </DropdownMenuTrigger>
    <DropdownMenuContent side="right" align="start">
        <Link to={'/'+item?.id}>
      <DropdownMenuItem>
        <span>View Remainder</span>
      </DropdownMenuItem>
      </Link>
      <DropdownMenuItem>
        <span onClick={() => DeleteRemainder(item.id)}>Delete Remainder</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}