"use client";

import { sidebarLinks } from "@/constants/index";
import { SignedIn, SignOutButton, useAuth, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LeftSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { signOut } = useClerk();
  const { userId } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <section className="custom-scrollbar leftsidebar bg-dark-1">
      <div className="flex w-full flex-1 flex-col gap-6 px-6 py-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") {
            link.route = `${link.route}/${userId}`;
          }

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`${isActive && "bg-primary-500"} leftsidebar_link`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <div className="flex cursor-pointer gap-4 p-4" onClick={handleLogout}>
            <Image
              src="/assets/logout.svg"
              alt="logout"
              width={24}
              height={24}
            />

            <p className="px-4 text-light-2 max-lg:hidden">Logout</p>
          </div>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSideBar;
