import React from 'react';
import { Activity, Stethoscope } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-100 p-6 rounded-t-2xl flex flex-col items-center justify-center text-center shadow-sm z-10 relative">
      <div className="bg-medical-50 p-3 rounded-full mb-3 ring-4 ring-medical-50/50">
        <Activity className="w-8 h-8 text-medical-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
        Hospital System Coordinator
      </h1>
      <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 font-medium">
        <Stethoscope className="w-4 h-4" />
        <span>Koordinator Pusat Sistem Agen AI</span>
      </div>
    </header>
  );
};
