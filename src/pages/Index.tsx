import { TopHeader } from "@/components/layout/TopHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Calendar, DollarSign, TrendingUp, Activity } from "lucide-react";

const statsCards = [
  {
    title: "Total Clients",
    value: "847",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Polices Actives",
    value: "1,242",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: Target,
  },
  {
    title: "RDV ce mois",
    value: "48",
    change: "+23.1%",
    changeType: "positive" as const,
    icon: Calendar,
  },
  {
    title: "Commissions",
    value: "CHF 24,500",
    change: "+15.3%",
    changeType: "positive" as const,
    icon: DollarSign,
  },
];

const recentActivity = [
  { id: 1, type: "contact", message: "Nouveau client : Jean Dupont", time: "Il y a 2 min" },
  { id: 2, type: "opportunity", message: "Devis LAMal envoyé à Marie Martin", time: "Il y a 15 min" },
  { id: 3, type: "appointment", message: "RDV confirmé avec Pierre Durand", time: "Il y a 1 heure" },
  { id: 4, type: "payment", message: "Commission reçue : CHF 850", time: "Il y a 2 heures" },
  { id: 5, type: "contact", message: "Renouvellement auto : Sophie Bernard", time: "Il y a 3 heures" },
];

const upcomingRenewals = [
  { id: 1, client: "Jean Dupont", type: "LAMal", date: "15 fév. 2026", prime: "CHF 380/mois" },
  { id: 2, client: "Marie Martin", type: "Auto", date: "28 fév. 2026", prime: "CHF 1,200/an" },
  { id: 3, client: "Pierre Durand", type: "Ménage RC", date: "01 mars 2026", prime: "CHF 450/an" },
];

export default function Index() {
  return (
    <div className="flex flex-col">
      <TopHeader 
        title="Dashboard" 
        subtitle="Bienvenue ! Voici votre aperçu." 
      />
      
      <div className="flex-1 space-y-6 p-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>{" "}
                  vs mois dernier
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Activité récente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Renewals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Renouvellements à venir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingRenewals.map((renewal) => (
                  <div key={renewal.id} className="flex flex-col gap-1 border-b pb-3 last:border-0">
                    <p className="text-sm font-medium">{renewal.client}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{renewal.type}</span>
                      <span>{renewal.date}</span>
                    </div>
                    <p className="text-xs text-primary font-medium">{renewal.prime}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
