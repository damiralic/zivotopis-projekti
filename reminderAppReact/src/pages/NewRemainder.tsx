import { RemainderContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import supabase from "@/supabase-client";
import { createContext, useContext, useState } from "react";

type TriggerType={
    trigger: boolean
}

export const TriggerContext = createContext<TriggerType>({
    trigger: false
})


export const NewRemainder = () => {
  const [newRemainder, setNewRemainder] = useState("");
  const {remainder,setRemainder} = useContext(RemainderContext);

  const fetchNewRemainders = async () => {
    const {data, error} = await supabase.from("Reminder").select("*");
    if(error){
      console.log("Error fetching: ", error);
    }else{
        setRemainder(data);
      }
  };

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const endDate = new Date().toLocaleString("en-CA", { timeZone: userTimeZone, hour12: false }).replace(",", "");

    const addRemainder = async () => {
        const newRemainderData = {
          name: newRemainder,
          isCompleted: false,
          endDate: endDate
        }
        const {data, error} = await supabase.from("Reminder").insert([newRemainderData]).single();
    
        if(error){
          console.log("Error adding remainder: ", error);
        }else{
          setRemainder((prev) => [...prev, data])
          setNewRemainder("");
          fetchNewRemainders();
        }
      }

    return(
        <div className="flex w-full max-w-sm items-center space-x-2 absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
        <Label htmlFor="Title">Title</Label>
        <Input type="text" id="title" placeholder="Title" value={newRemainder} onChange={(e) => setNewRemainder(e.target.value)}/>
        <Button type="submit" onClick={addRemainder}>Add new remainder</Button>
      </div>
    );
}