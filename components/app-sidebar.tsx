"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Droplets, User, Users, Sprout, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const navigationItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Nile River",
    url: "/river/nile",
    icon: Droplets,
  },
  {
    title: "Amazon River",
    url: "/river/amazon",
    icon: Droplets,
  },
  {
    title: "Yangtze River",
    url: "/river/yangtze",
    icon: Droplets,
  },
]

const roleItems = [
  {
    title: "Student Dashboard",
    url: "/student-dashboard",
    icon: User,
  },
  {
    title: "Adult Dashboard",
    url: "/adult-dashboard",
    icon: Users,
  },
  {
    title: "Farmer Dashboard",
    url: "/farmer-dashboard",
    icon: Sprout,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <Droplets className="size-6 text-primary" />
          <h2 className="text-lg font-bold">Breathing Rivers</h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Roles</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {roleItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full justify-start gap-2"
        >
          <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
