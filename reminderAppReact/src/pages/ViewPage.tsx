import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import supabase from "@/supabase-client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { RemainderContext } from "@/App";

export const ViewPage = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const {remainder, setRemainder} = useContext(RemainderContext);
    
    

    const [name, setName] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [endDate, setEndDate] = useState("");

    const fetchAllRemainders = async () => {
        const {data, error} = await supabase.from("Reminder").select("*");
        if(error){
          console.log("Error fetching: ", error);
        }else{
            setRemainder(data);
          }
      };

    const fetchNewRemainders = async () => {
        const {data, error} = await supabase.from("Reminder").select().eq("id", id).single();
        if(error){
          console.log("Error fetching: ", error);
          navigate('/', {replace: true});
        }else{
            setName(data.name);
            setIsCompleted(data.isCompleted);
            setEndDate(data.endDate);
            console.log(data);
          }
      };

      const IsCompletedTrue = () => {
        setIsCompleted(true);
      }

    useEffect(() => {
        fetchNewRemainders();
    }, [id, navigate])

    const updateRemainder = async () => {
        const {data, error} = await supabase.from("Reminder").update({name, isCompleted, endDate}).eq("id", id).select();
    
        if(error){
          console.log("Error adding remainder: ", error);
        }else{
            fetchAllRemainders();
        }
      }

    return (
        <div>
        <div className="flex w-full max-w-lg items-center space-x-2 absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
        <Label htmlFor="Title">Title</Label>
        <Input type="text" id="title" placeholder="Title" value={name} onChange={(e) => setName(e.target.value)}/>
        <Button type="submit" onClick={updateRemainder}>Update remainder</Button>
        <Button type="submit" onClick={IsCompletedTrue}>Check for complete</Button>
        {isCompleted == true && <Check />}
      </div>
      </div>
    );
}