import { Layout } from "@/components/layout/Layout";
import { Users, Video, MessageSquare, FileText } from "lucide-react";

const Collaboration = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Collaboration</h1>
          <p className="text-gray-500">Travaillez en équipe efficacement</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <Video className="h-8 w-8 text-blue-500 mb-3" />
            <h3 className="font-semibold text-gray-900">Visioconférence</h3>
            <p className="text-sm text-gray-500">Réunions en ligne</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <MessageSquare className="h-8 w-8 text-green-500 mb-3" />
            <h3 className="font-semibold text-gray-900">Chat d'équipe</h3>
            <p className="text-sm text-gray-500">Communication instantanée</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <FileText className="h-8 w-8 text-purple-500 mb-3" />
            <h3 className="font-semibold text-gray-900">Documents partagés</h3>
            <p className="text-sm text-gray-500">Collaboration en temps réel</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
            <Users className="h-8 w-8 text-orange-500 mb-3" />
            <h3 className="font-semibold text-gray-900">Groupes de travail</h3>
            <p className="text-sm text-gray-500">Organisez vos équipes</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Collaboration;
