"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { div } from "motion/react-client";


function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive} >
        <Link href={'/'}>
          <MenuItem setActive={setActive} active={active} item="Home" >
          </MenuItem>
        </Link>
        <Link href={'/'}>
          <MenuItem setActive={setActive} active={active} item="Our Courses" >
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href={'/course'}>Explore Courses</HoveredLink>
              <HoveredLink href={'/course'}>Basic Music Theory</HoveredLink>
              <HoveredLink href={'/course'}>Advanced Composition</HoveredLink>
              <HoveredLink href={'/course'}>Song Writing</HoveredLink>
              <HoveredLink href={'/course'}>Music Production</HoveredLink>
            </div>
          </MenuItem>
        </Link>
        <Link href={'/contactus'} >
          <MenuItem setActive={setActive} active={active} item="Contact US" />
        </Link>
      </Menu>
    </div>
  );
}
export default Navbar;
