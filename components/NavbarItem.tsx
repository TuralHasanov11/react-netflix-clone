import React from "react";

interface NavbarItemProps {
  label: string;
  active?: boolean;
}

function NavbarItem({ label, active }: NavbarItemProps) {
  return (
    <div
      className={
        active
          ? "text-white cursor-default"
          : "text-gray-200 hover:text-gray-300 cursor-pointer transition"
      }
    >
      {label}
    </div>
  );
}

export default NavbarItem;
