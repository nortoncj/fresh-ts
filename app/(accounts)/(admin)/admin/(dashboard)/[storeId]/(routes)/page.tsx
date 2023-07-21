import prismadb from "@/app/libs/prismadb"

interface AdminHomeProps{
  params: {storeId: string}
}

const AdminHome: React.FC<AdminHomeProps> = async ({
  params
}) => {

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  })

  return (<div>
    <h1>Admin Home</h1>
    <small className="text-muted">{store?.name}</small>
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        Store Switcher
      </div>
     
    </div>
    
    </div>)
};

export default AdminHome;
