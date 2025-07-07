
"use client"

import * as React from "react"
import Link from "next/link"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Home,
  Users,
  Briefcase,
  History,
  Settings,
  LogOut,
  ChevronDown,
  HelpCircle,
  Loader2,
  Megaphone,
  Shield,
} from "lucide-react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/Logo"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

function UserMenu() {
   const { open } = useSidebar();
   const { appUser, logoutUser } = useAuth();

   if (!appUser) {
    return null;
   }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={`w-full justify-start items-center gap-3 px-2.5 ${open ? '' : 'px-0'}`}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={appUser.avatar} alt={appUser.name} />
            <AvatarFallback>{appUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
           <div className={`flex flex-col items-start transition-all duration-200 ${open ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
              <span className="font-medium text-sm truncate">{appUser.name}</span>
              <span className="text-xs text-muted-foreground truncate">{appUser.email}</span>
            </div>
          <ChevronDown className={`ml-auto h-4 w-4 shrink-0 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{appUser.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {appUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile">
            <Users className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutUser}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const baseNavItems = [
    { href: "/dashboard", icon: Home, label: "Tu Espacio Interior" },
    { href: "/dashboard/connections", icon: Users, label: "Mis Portales" },
    { href: "/dashboard/history", icon: History, label: "Memorias" },
];

const advertisingNavItem = { href: "/dashboard/advertising", icon: Megaphone, label: "Publicidad" };
const adminNavItem = { href: "/dashboard/admin", icon: Shield, label: "Admin" };
const settingsNavItem = { href: "/dashboard/settings", icon: Settings, label: "Configuración" };


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { appUser, firebaseUser, loading } = useAuth();

  React.useEffect(() => {
    if (!loading && !firebaseUser) {
      router.push('/login');
    }
  }, [firebaseUser, loading, router]);

  if (loading || !firebaseUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const canSeeAdvertising = appUser && (appUser.email === 'alcantara00789@gmail.com' || !!appUser.claimedBusinessId);
  const canSeeAdmin = appUser && appUser.email === 'alcantara00789@gmail.com';

  const navItems = [
    ...baseNavItems,
    ...(canSeeAdvertising ? [advertisingNavItem] : []),
    ...(canSeeAdmin ? [adminNavItem] : []),
    settingsNavItem
  ];

  const getPageTitle = () => {
    if (pathname.startsWith('/dashboard/users/')) return "Perfil de Viajero";
    if (pathname.startsWith('/dashboard/connections/')) return "Detalles del Portal";
    const activeItem = navItems.find(item => pathname.startsWith(item.href));
    return activeItem?.label || "AFKDpu";
  }

  return (
    <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                 <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                        tooltip={{children: item.label}}
                    >
                        <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <UserMenu />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                 <SidebarTrigger className="sm:hidden" />
                 <div className="flex-1">
                    <h1 className="font-headline text-2xl font-semibold tracking-tight">
                        {getPageTitle()}
                    </h1>
                 </div>
            </header>
            <main className="p-4 sm:px-6 sm:py-0 space-y-4">
                 {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  )
}
