import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";

export default function Dashboard(){
    return(
        <>
    <div className="flex flex-col min-h-screen">
          <Header/>

       <div className="flex  flex-grow">
        <Sidebar isOpen={true} />
        <main className="flex-grow p-4 ">
          <Outlet/>
        </main>
      </div>
    </div>
        </>
    )
}