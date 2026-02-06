import { TopHeader } from "@/components/layout/TopHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Folder, FileText, Image, MoreHorizontal } from "lucide-react";

const folders = [
  { name: "Clients", files: 234, icon: Folder },
  { name: "Polices", files: 156, icon: FileText },
  { name: "Attestations", files: 89, icon: FileText },
  { name: "Photos", files: 45, icon: Image },
];

export default function Drive() {
  return (
    <div className="flex flex-col h-screen">
      <TopHeader
        title="Drive"
        subtitle="Stockage de fichiers"
        actions={
          <Button size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Uploader
          </Button>
        }
      />
      
      <div className="flex-1 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {folders.map((folder) => (
            <Card key={folder.name} className="p-4 cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <folder.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{folder.name}</p>
                    <p className="text-sm text-muted-foreground">{folder.files} fichiers</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
