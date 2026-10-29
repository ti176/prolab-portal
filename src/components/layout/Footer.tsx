import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0F1B2D] to-[#00594C] text-white/70 text-xs py-4 px-4 text-center border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
        <div>
          <span className="font-bold text-white">PróLab Biotecnologia</span> · R. Ângelo Máglio, 65 - Vila Yara, Osasco - SP · (11) 3685-4003
        </div>
        <div className="text-white/50">
          Portal do Colaborador · Versão 2.0 Modernizada
        </div>
      </div>
    </footer>
  );
};
