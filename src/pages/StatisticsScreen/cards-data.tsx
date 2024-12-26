import React from "react";
import { BadgeEuro, ShoppingCart, UserPlus, Banknote } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="flex items-center p-4 bg-white shadow rounded-lg">
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-full ${
          color || "bg-blue-500"
        } text-white`}
      >
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
};

export function CardsData() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Marcações em Euros"
        value="€ 12.584"
        icon={<BadgeEuro size={24} />}
        color="bg-black"
      />
      <StatCard
        title="Quantidade em und"
        value={450}
        icon={<ShoppingCart size={24} />}
        color="bg-black"
      />
      <StatCard
        title="Valor médio por marcação"
        value={"€ " + 350}
        icon={<Banknote size={24} />}
        color="bg-black"
      />
       <StatCard
        title="Novos Clientes"
        value={87}
        icon={<UserPlus size={24} />}
        color="bg-black"
      />
    </div>
  );
}
