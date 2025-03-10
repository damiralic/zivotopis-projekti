import { RemainderContext } from "@/App";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import classes from './../styles/newRemainder.module.css'

type TriggerType={
    trigger: boolean
}

export const TriggerContext = createContext<TriggerType>({
    trigger: false
})


export const NewRemainder = () => {
  const [newRemainder, setNewRemainder] = useState("");
  const {remainder,setRemainder} = useContext(RemainderContext);
  const [date, setDate] = useState<Date | undefined>(new Date())

  const formattedDate = date?.toISOString().split('T')[0];

  const fetchNewRemainders = async () => {
    await axios.get("https://localhost:7234/api/Remainder").then((res: any) => {
      setRemainder(res.data);
    })
  };

    const addRemainder = async () => {
        const newRemainderData = {
          name: newRemainder,
          isCompleted: false,
          startDateTime: formattedDate
        }
        try{
          axios.post("https://localhost:7234/api/Remainder", newRemainderData).then((res) => {
            setRemainder((prev) => [...prev, res.data])
            setNewRemainder("");
            fetchNewRemainders();
            console.log(date);
          })
        }catch (err){
          console.error("Error adding remainder!", err);
        }
      }

    return(
        <div className={classes.container}>
          {/* <div className={classes.formGroup}>
        <Label htmlFor="Title">Add a new remainder!</Label>
        <Input type="text" id="title" placeholder="Title" value={newRemainder} onChange={(e) => setNewRemainder(e.target.value)}/>
        <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
      footer={date ? `Selected: ${date.toLocaleDateString()}` : "Pick a day."}
    />
        <Button type="submit" onClick={addRemainder}>Add new remainder</Button>
          </div> */}
      </div>
    );
}