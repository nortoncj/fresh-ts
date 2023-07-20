import getCurrentUser from "@/app/actions/getCurrentUser";
import "./user-login-page.css";
import AdminNavbar from "./Navbar";





async function Sidebar({ children }: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser();
    
  return (
    <div className="h-full lg:flex lg:flex-row   sm:flex-col">
      <AdminNavbar currentUser={currentUser!} >  
      <main className="lg:pl-20 h-full w-full ">
      
      {children}
        
      </main>
      </AdminNavbar>
    </div>
  );
}

export default Sidebar;
