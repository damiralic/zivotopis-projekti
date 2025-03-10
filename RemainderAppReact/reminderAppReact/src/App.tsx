import { useEffect, useState, createContext } from 'react'
import './App.css'
import { AppSidebar } from "@/components/app-sidebar"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { NewRemainder } from './pages/NewRemainder'
import { ViewPage } from './pages/ViewPage'
import axios from 'axios'
import { HomePage } from './pages/HomePage'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

// Array objekata, koji tip bi trebao biti ovdje?
export const RemainderContext = createContext<{ remainder: any[], setRemainder: React.Dispatch<React.SetStateAction<any[]>> }>({ remainder: [], setRemainder: () => {} });

export default function App({children}: {children: React.ReactNode}) {
  const [remainder, setRemainder] = useState<any[]>([]); // zato sto imamo array objekata, staviti any je dosta ne sigurno.

  useEffect(() => {
    fetchRemainders();
  }, []);

  const fetchRemainders = async () => {
    axios.get("https://localhost:7234/api/Remainder").then((res: any) => {
      setRemainder(res.data);
    })
  };

  return (
    <MantineProvider forceColorScheme='dark'>
      <RemainderContext.Provider value={{remainder, setRemainder}}>
        <Router>
      <AppSidebar />
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/create-new" element={<NewRemainder />}/>
            <Route path="/:id" element={<ViewPage />}/>
            <Route path="*" element={<h1>Page not found!</h1>}/>
          </Routes>
    </Router>
    </ RemainderContext.Provider>
    </MantineProvider>
  )
}

