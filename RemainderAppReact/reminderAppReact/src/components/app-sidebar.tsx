import { useContext } from "react"
import {RemainderContext} from '../App'
 
import { MoreHorizontal, Pencil, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import classes from './../styles/Navbar.module.css';
import { SegmentedControl, Text } from '@mantine/core';

 
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
  //   <Sidebar>
  //     <SidebarContent>
  //       <SidebarGroup>
  //         <SidebarGroupLabel>Remainders</SidebarGroupLabel>
  //         <Link to="/create-new">
  //         <SidebarGroupAction title="Add Remainder">
  //       <Plus /> <span className="sr-only">Add Remainder</span>
  //     </SidebarGroupAction>
  //     </Link>
  //         <SidebarGroupContent>
  //           <SidebarMenu>
  //             {remainder.map((item, index) => (
  //               <SidebarMenuItem key={index}>
  //                     <SidebarMenuButton asChild>
  //   <a>
  //     <Pencil />
  //     <span>{item?.name}</span>
  //   </a>
  // </SidebarMenuButton>
  // <DropdownMenu>
  //   <DropdownMenuTrigger asChild>
  //     <SidebarMenuAction>
  //       <MoreHorizontal />
  //     </SidebarMenuAction>
  //   </DropdownMenuTrigger>
  //   <DropdownMenuContent side="right" align="start">
  //       <Link to={'/'+item?.id}>
  //     <DropdownMenuItem>
  //       <span>View Remainder</span>
  //     </DropdownMenuItem>
  //     </Link>
  //     <DropdownMenuItem>
  //       <span onClick={() => DeleteRemainder(item.id)}>Delete Remainder</span>
  //     </DropdownMenuItem>
  //   </DropdownMenuContent>
  // </DropdownMenu>
  //               </SidebarMenuItem>
  //             ))}
  //           </SidebarMenu>
  //         </SidebarGroupContent>
  //       </SidebarGroup>
  //     </SidebarContent>
  //   </Sidebar>

  <nav className={classes.navbar}>
  <div>
    <Text fw={500} size="sm" className={classes.title} c="dimmed" mb="xs">
      Remainders
    <Plus />
    </Text>
  </div>

  <div className={classes.navbarMain}>{remainder.map((item) => (
    <p key={item.id}>{item.name}</p>
  ))}</div>
</nav>
  );
}