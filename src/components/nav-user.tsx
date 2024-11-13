import React from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export function MenuComponent() {
  return (
    <div className="flex w-full justify-center">
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-4 p-2 rounded-sm">
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/home-screen"
              className="text-black hover:underline"
            >
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/utentes-screen"
              className="text-black hover:underline"
            >
              Utentes
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/services"
              className="text-black hover:underline"
            >
              Colaboradores
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/contact"
              className="text-black hover:underline"
            >
              Serviços
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/contact"
              className="text-black hover:underline"
            >
              Estatistica
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/contact"
              className="text-black hover:underline"
            >
              Definições
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
