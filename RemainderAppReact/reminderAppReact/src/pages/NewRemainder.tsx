import { RemainderContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
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
    await axios.get("https://localhost:7234/api/Remainder").then((res: any) => {
      setRemainder(res.data);
    })
  };

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const endDateString = new Date().toLocaleString("en-CA", { timeZone: userTimeZone, hour12: false }).replace(",", "");

  const endDate = new Date(endDateString);

    const addRemainder = async () => {
        const newRemainderData = {
          name: newRemainder,
          isCompleted: false,
          startDateTime: endDate
        }
        try{
          axios.post("https://localhost:7234/api/Remainder", newRemainderData).then((res) => {
            setRemainder((prev) => [...prev, res.data])
            setNewRemainder("");
            fetchNewRemainders();
          })
        }catch (err){
          console.error("Error adding remainder!", err);
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