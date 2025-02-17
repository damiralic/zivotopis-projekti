import { useEffect, useState, createContext, useContext } from 'react'
import './App.css'
import supabase from "./supabase-client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { NewRemainder } from './pages/NewRemainder'
import { ViewPage } from './pages/ViewPage'

// Array objekata, koji tip bi trebao biti ovdje?
export const RemainderContext = createContext<{ remainder: any[], setRemainder: React.Dispatch<React.SetStateAction<any[]>> }>({ remainder: [], setRemainder: () => {} });

export default function App({children}: {children: React.ReactNode}) {
  const [remainder, setRemainder] = useState<any[]>([]); // zato sto imamo array objekata, staviti any je dosta ne sigurno.

  useEffect(() => {
    fetchRemainders();
  }, []);

  const fetchRemainders = async () => {
    const {data, error} = await supabase.from("Reminder").select("*");
    if(error){
      console.log("Error fetching: ", error);
    }else{
        setRemainder(data);
      }
  };


  return (
    <div>
      <RemainderContext.Provider value={{remainder, setRemainder}}>
        <Router>
        <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center">
        <h1>Remainder App</h1>
        </div>
      </main>
    </SidebarProvider>
          <Routes>
            <Route path="/"/>
            <Route path="/create-new" element={<NewRemainder />}/>
            <Route path="/:id" element={<ViewPage />}/>
            <Route path="*" element={<h1>Page not found!</h1>}/>
          </Routes>
    </Router>
    </ RemainderContext.Provider>
    </div>
  )
}

