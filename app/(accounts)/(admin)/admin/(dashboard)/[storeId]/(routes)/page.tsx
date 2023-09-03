import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/libs/prismadb";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import "./adminRoot.css";
import { Heading } from "@/components/ui/heading";
import { formatter } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Book,
  CreditCard,
  DollarSign,
  Eye,
  MouseIcon,
  Package,
} from "lucide-react";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { Overview } from "@/components/overview";
import { getGraphRevenue } from "@/actions/get-graph-revenue";
interface AdminHomeProps {
  params: { storeId: string };
}
const AdminHome: React.FC<AdminHomeProps> = async ({ params }) => {
  const user = await getCurrentUser();
  const userId = user?.id;
  if (!userId) {
    redirect("/login");
  }
  const stores = await prismadb?.store?.findMany({
    where: {
      userId,
    },
  });
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);
  return (
    <div>
      <Heading title="Admin Home" description="Store Overview" />
      <div className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <StoreSwitcher items={stores} />
          <div className="date">
            <input type="date" className="date" />
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="grid gap-4 grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-8">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatter.format(totalRevenue)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-8">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+ {salesCount} </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-8">
                <CardTitle className="text-sm font-medium">
                  Products In Stock
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stockCount}</div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Card className="col-span-4">
          <CardHeader className="">
            <CardTitle className="">Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
        <main>
          <div className="insights">
            <div className="visits">
              <Eye />
              <div className="middle">
                <div className="left">
                  <h3>Total Visits</h3>
                  <h1>23,200</h1>
                </div>
                <div className="progress">
                  <svg>
                    <circle cx="38" cy="38" r="36"></circle>
                  </svg>
                  <div className="number">
                    <p>81%</p>
                  </div>
                </div>
              </div>
              <small className="text-muted">Last 24 Hours</small>
            </div>
            {/* <!-- END TOTAL VISITS --> */}
            <div className="clicks">
              <MouseIcon />
              <div className="middle">
                <div className="left">
                  <h3>Total Clicks</h3>
                  <h1>9,532</h1>
                </div>
                <div className="progress">
                  <svg>
                    <circle cx="38" cy="38" r="36"></circle>
                  </svg>
                  <div className="number">
                    <p>62%</p>
                  </div>
                </div>
              </div>
              <small className="text-muted">Last 24 Hours</small>
            </div>
            {/* <!-- END TOTAL CLICKS --> */}
            <div className="contacts">
              <Book />
              <div className="middle">
                <div className="left">
                  <h3>Total Contacts</h3>
                  <h1>304</h1>
                </div>
                <div className="progress">
                  <svg>
                    <circle cx="38" cy="38" r="36"></circle>
                  </svg>
                  <div className="number">
                    <p>48%</p>
                  </div>
                </div>
              </div>
              <small className="text-muted">Last 24 Hours</small>
            </div>
            {/* <!-- END TOTAL CONTACTS --> */}
          </div>
          {/* <!-- END OF INSIGHTS --> */}
          <div className="recent-orders">
            <h2>Recent Orders</h2>
            <table>
              <thead>
                <tr>
                  <th>Prouduct Name</th>
                  <th>Prouduct Number</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Gladius</td>
                  <td>CRDPW3462</td>
                  <td>Due</td>
                  <td className="warning">Pending</td>
                  <td className="primary">Details</td>
                </tr>
                <tr>
                  <td>Gladius</td>
                  <td>CRDPW3462</td>
                  <td>Due</td>
                  <td className="warning">Pending</td>
                  <td className="primary">Details</td>
                </tr>
                <tr>
                  <td>Gladius</td>
                  <td>CRDPW3462</td>
                  <td>Due</td>
                  <td className="warning">Pending</td>
                  <td className="primary">Details</td>
                </tr>
                <tr>
                  <td>Gladius</td>
                  <td>CRDPW3462</td>
                  <td>Due</td>
                  <td className="warning">Pending</td>
                  <td className="primary">Details</td>
                </tr>
              </tbody>
            </table>
            <a href="#">Show All</a>
          </div>
        </main>
      </div>
    </div>
  );
};
export default AdminHome;