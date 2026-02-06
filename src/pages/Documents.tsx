import { TopHeader } from "@/components/layout/TopHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, FilePlus, FileCheck, FileWarning } from "lucide-react";

const documentTypes = [
  { title: "Polices d'assurance", count: 156, icon: FileCheck, color: "text-green-600" },
  { title: "Devis en attente", count: 23, icon: FilePlus, color: "text-blue-600" },
  { title: "Documents à signer", count: 8, icon: FileWarning, color: "text-orange-600" },
  { title: "Correspondance", count: 342, icon: FileText, color: "text-gray-600" },
];

export default function Documents() {
  return (
    <div className="flex flex-col h-screen">
      <TopHeader
        title="Documents"
        subtitle="Gestion documentaire"
        actions={
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un document
          </Button>
        }
      />
      
      <div className="flex-1 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {documentTypes.map((doc) => (
            <Card key={doc.title} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{doc.title}</CardTitle>
                <doc.icon className={`h-5 w-5 ${doc.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{doc.count}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
