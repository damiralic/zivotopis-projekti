import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { RemainderContext } from "@/App";
import axios from "axios";

export const ViewPage = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const {remainder, setRemainder} = useContext(RemainderContext);
    
    

    const [name, setName] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [endDate, setEndDate] = useState("");

    const fetchAllRemainders = async () => {
      await axios.get("https://localhost:7234/api/Remainder").then((res: any) => {
        setRemainder(res.data);
      })
      };

    const fetchNewRemainders = async () => {
      try{
        await axios.get("https://localhost:7234/api/Remainder/" + id).then((res) => {
            setName(res.data.name);
            setIsCompleted(res.data.isCompleted);
            setEndDate(res.data.endDate);
            console.log(res.data);
        })
      }catch(err){
        console.error("Problem fetching with id:", err);
      }
      };

      const IsCompletedTrue = () => {
        setIsCompleted(true);
      }

    useEffect(() => {
        fetchNewRemainders();
    }, [id, navigate])

    const updateRemainder = async () => {

      try{
        await axios.put(`https://localhost:7234/api/Remainder/${id}`, {name, isCompleted, endDate});

        fetchAllRemainders();

        
      }catch (err){
        console.error("Error updating remainder!", err);
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