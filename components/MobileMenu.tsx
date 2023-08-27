import { navbarItems } from "@/data/navbar";
import React from "react";

interface MobileMenuProps {
  visible?: boolean;
}

function MobileMenu({ visible }: MobileMenuProps) {
  if (!visible) return null;

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        {navbarItems.map((item) => (
          <div
            key={item.label}
            className="px-3 text-center text-white hover:underline"
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MobileMenu;
