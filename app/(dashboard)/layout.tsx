"use client";

import Link from "next/link";
import { useState, Suspense, use } from "react";
import { Button } from "@/components/ui/button";
import { Book, Home, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient, useSession } from "@/lib/auth-client";

//import { signOut } from "@/app/(login)/actions";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userPromise } = useUser();
  const user = use(userPromise);
  const { data: session } = authClient.useSession();

  //const { data: session } = useSession();
  const router = useRouter();
  const logOut = async () => {
    await authClient.signOut();
    router.refresh();
    router.replace("/sign-in");
    // redirect to login page
  };
  if (!session) {
    return (
      <>
        <Button
          asChild
          className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-full"
        >
          <Link href="/sign-in">Connexion</Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                            bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                            text-black dark:text-white transition-all duration-300 
                            group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                            hover:shadow-md dark:hover:shadow-neutral-800/50"
        >
          <Link href="/sign-up">Inscription</Link>
        </Button>
      </>
    );
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <div className="cursor-pointer ">
          <p>{session.user.name} </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard" className="flex w-full items-center">
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        <button onClick={logOut} className="flex w-full">
          <DropdownMenuItem className="w-full flex-1 cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Déconnexion</span>
          </DropdownMenuItem>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
import img from "../../components/imgs/mrigal.png";
export function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image src={img} alt="My logo" />
        </div>
        <div className="flex items-center space-x-4">
          <Suspense>
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
import digit from "../../components/imgs/digit.png";
import { SocialIcon } from "react-social-icons";
import { Mail, MapPin, Phone } from "lucide-react";
import { useUser } from "@/lib/context";
export function Footer() {
  return (
    <footer className="bg-white text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-16">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">
              <Image src={digit} alt="DigitServZ" />
            </h3>
            <p className="text-black mb-6 text-start line-clamp-3">
              DigitservZ Nous fournissons des services exceptionnels pour
              répondre à tous vos besoins.
            </p>
            <div className="flex space-x-4">
              <SocialIcon
                network="tiktok"
                url="https://www.tiktok.com/@mrigal68?_t=ZM-8v2dmkFRkd4&_r=1"
                style={{ height: 30, width: 30 }}
              />
              <SocialIcon
                network="instagram"
                url="https://www.instagram.com/mrigal.dz_16/"
                style={{ height: 30, width: 30 }}
              />
              <SocialIcon
                network="facebook"
                url="https://web.facebook.com/profile.php?id=61574467266238"
                style={{ height: 30, width: 30 }}
              />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5  text-black" />
                <span className="text-black">
                  ANPT,incubateur,Sidi-Abdellah
                  <br />
                  Rahmania,Alger
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 mt-0.5  text-black" />
                <span className="text-black">WhatsApp: 0775 96 96 42</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 mt-0.5  text-black" />
                <span className="text-black">mrigal@digitservz.dz</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Section */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-black text-sm">
              &copy; {new Date().getFullYear()} Sarl DigitservZ
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/mentions-legales"
                className="text-black text-sm hover:text-primary transition-colors"
              >
                Mentions légales
              </Link>

              <Link
                href="/politique-de-confidentialite"
                className="text-black text-sm hover:text-primary transition-colors"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="flex flex-col min-h-screen">{children}</section>;
}
