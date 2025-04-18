"use client";

import Left from '@/app/(frontend)/containers/header/Left';
import Right from '@/app/(frontend)/containers/header/Right';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navLinks = [
  { name: "Overview", path: "/super-admin/dashboard" },
  { name: "Category", path: "/super-admin/category" },
  { name: "Sub-Category", path: "/super-admin/sub-category" },
  // { name: "Products", path: "/super-admin/products" },
  // { name: "Orders", path: "/super-admin/orders" },
  { name: "Sellers", path: "/super-admin/sellers" },
  { name: "Users", path: "/super-admin/users" },
  { name: "Settings", path: "/super-admin/settings" },
];

const SuperHeader = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center px-6 h-16 border-b bg-white shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-8">
        <Right />
        {/* Navigation Links */}
        <ul className="flex gap-4 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`transition-colors duration-200 ${
                pathname.startsWith(link.path) ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </ul>
      </div>

      {/* Right Section */}
      <Left />
    </div>
  );
};

export default SuperHeader;
