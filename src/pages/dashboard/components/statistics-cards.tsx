import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useDashboardOverview } from "@/hooks/dashboard/use-dashboard-overview";
import { TrendingUp, AlertCircle, TriangleAlert } from "lucide-react";

export function StatisticsCards() {
  const { data, isLoading, error } = useDashboardOverview();

  const dueSoonDocument = data?.due_soon_documents
    ? data?.due_soon_documents.length
    : 0;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-0 shadow-sm transition-shadow hover:shadow-md">
        <CardContent className="pt-6">
          <div className="mb-4 flex items-start justify-between">
            <div
              className={`rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-3`}
            >
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </div>

          <h3 className="text-muted-foreground mb-1 text-sm font-medium">
            Total de Documentos
          </h3>
          <p className="text-foreground mb-2 text-2xl font-bold">
            {isLoading ? <Spinner /> : data?.total_documents.length}
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm transition-shadow hover:shadow-md">
        <CardContent className="pt-6">
          <div className="mb-4 flex items-start justify-between">
            <div
              className={`rounded-lg bg-gradient-to-br from-red-500 to-red-600 p-3`}
            >
              <AlertCircle className="h-5 w-5 text-white" />
            </div>
          </div>

          <h3 className="text-muted-foreground mb-1 text-sm font-medium">
            Documentos Vencidos
          </h3>
          <p className="text-foreground mb-2 text-2xl font-bold">
            {isLoading ? <Spinner /> : data?.expired_documents.length}
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm transition-shadow hover:shadow-md">
        <CardContent className="pt-6">
          <div className="mb-4 flex items-start justify-between">
            <div
              className={`rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 p-3`}
            >
              <TriangleAlert className="h-5 w-5 text-white" />
            </div>
          </div>

          <h3 className="text-muted-foreground mb-1 text-sm font-medium">
            Documentos a Vencer
          </h3>
          <p className="text-foreground mb-2 text-2xl font-bold">
            {isLoading ? <Spinner /> : dueSoonDocument}
          </p>
        </CardContent>
      </Card>
    </div>
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    //   {stats.map((stat, index) => {
    //     const Icon = stat.icon
    //     return (
    //       <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
    //         <CardContent className="pt-6">
    //           <div className="flex items-start justify-between mb-4">
    //             <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
    //               <Icon className="w-5 h-5 text-white" />
    //             </div>
    //           </div>
    //           <h3 className="text-sm font-medium text-muted-foreground mb-1">
    //             {stat.title}
    //           </h3>
    //           <p className="text-2xl font-bold text-foreground mb-2">
    //             {stat.value}
    //           </p>
    //           <p className="text-xs text-muted-foreground">
    //             {stat.change}
    //           </p>
    //         </CardContent>
    //       </Card>
    //     )
    //   })}
    // </div>
  );
}
