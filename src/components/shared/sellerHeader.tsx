"use client";

import Left from '@/app/(frontend)/containers/header/Left';
import Right from '@/app/(frontend)/containers/header/Right';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navLinks = [
  { name: "Overview", path: "/seller/overview" },
  { name: "Products", path: "/seller/products" },
  { name: "Orders", path: "/seller/orders" },
  { name: "Users", path: "/seller/users" },
  { name: "Settings", path: "/seller/settings" },
];

const SellerHeader = () => {
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

export default SellerHeader;
