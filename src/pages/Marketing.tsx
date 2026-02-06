import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, Phone, Megaphone, Users, Target, Facebook, Instagram, RefreshCw, Receipt, FileText, CreditCard, UserCheck, Settings } from 'lucide-react';

const Marketing = () => {
  const campaignTypes = [
    { icon: Mail, title: 'Marketing par e-mail', description: 'Créez des campagnes email personnalisées', color: 'bg-blue-500' },
    { icon: MessageSquare, title: 'Campagne SMS', description: 'Envoyez des messages SMS ciblés', color: 'bg-pink-500' },
    { icon: Phone, title: 'Messageries', description: 'Gérez vos conversations clients', color: 'bg-green-500' },
    { icon: Megaphone, title: 'Diffusion vocale', description: 'Messages vocaux automatisés', color: 'bg-cyan-500' },
    { icon: Phone, title: 'Appel audio', description: 'Campagnes d\'appels automatiques', color: 'bg-cyan-500' }
  ];

  const audienceOptions = [
    { icon: Target, title: 'Google Ads', description: 'Créez des audiences Google', color: 'bg-blue-600' },
    { icon: Facebook, title: 'Publics Facebook +', description: 'Audiences Facebook personnalisées', color: 'bg-blue-700' },
    { icon: Users, title: 'Audience similaire', description: 'Trouvez des clients similaires', color: 'bg-blue-700' }
  ];

  const publications = [
    { icon: Facebook, title: 'Publicités Facebook', description: 'Créez des publicités Facebook', color: 'bg-blue-700' },
    { icon: Instagram, title: 'Publicités Instagram', description: 'Campagnes Instagram ciblées', color: 'bg-pink-600' }
  ];

  const salesBoost = [
    { icon: RefreshCw, title: 'Répéter les transactions', description: 'Automatisez les ventes récurrentes', color: 'bg-cyan-600' }
  ];

  const clientActions = [
    { icon: Receipt, title: 'Transactions', description: 'Suivez les transactions clients', color: 'bg-blue-700' },
    { icon: FileText, title: 'Formulaires CRM', description: 'Créez des formulaires personnalisés', color: 'bg-blue-700' },
    { icon: CreditCard, title: 'Paiement CRM', description: 'Gérez les paiements en ligne', color: 'bg-blue-700' },
    { icon: UserCheck, title: 'Prospects', description: 'Gérez vos prospects efficacement', color: 'bg-blue-700' }
  ];

  const ActionCard = ({ icon: Icon, title, description, color }: any) => (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur border-border/50">
      <CardContent className="p-6 text-center">
        <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Démarrer</h1>
          <p className="text-muted-foreground">Créez et gérez vos campagnes marketing</p>
        </div>

        {/* Créer une campagne */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Créer une campagne</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {campaignTypes.map((campaign, index) => (
              <ActionCard key={index} {...campaign} />
            ))}
          </div>
        </section>

        {/* Créer une audience */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Créer une audience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl">
            {audienceOptions.map((audience, index) => (
              <ActionCard key={index} {...audience} />
            ))}
          </div>
        </section>

        {/* Publications mises en avant */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Publications mises en avant</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {publications.map((publication, index) => (
              <ActionCard key={index} {...publication} />
            ))}
          </div>
        </section>

        {/* Augmentation des ventes */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Augmentation des ventes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {salesBoost.map((boost, index) => (
              <ActionCard key={index} {...boost} />
            ))}
          </div>
        </section>

        {/* Envoyer des actions clients */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Envoyer des actions clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {clientActions.map((action, index) => (
              <ActionCard key={index} {...action} />
            ))}
          </div>
        </section>

        {/* Aide à la configuration */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Aide à la configuration</h2>
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">Aide des partenaires dans la configuration</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Obtenez de l'aide pour configurer vos campagnes marketing et maximiser votre ROI
                  </p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  DEMANDER DE L'AIDE
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default Marketing;