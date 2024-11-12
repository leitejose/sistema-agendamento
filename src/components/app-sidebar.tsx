import * as React from "react"
import { Plus, ChevronDown, ChevronRight } from "lucide-react"

import { DatePicker } from "@/components/date-picker"
import { NavUser } from "@/components/nav-user"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

// Dados de exemplo
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  calendars: [
    {
      name: "Clínicos",
      items: ["Selecionar Todos", "Dr.João Pereira", "Dra. Marta Carvalho", "Dra. Helena Silva"],
    },
    {
      name: "Serviços",
      items: ["Consulta", "Inplanon", "Ecografia", "Citologia"],
    },
  ],
}

function Calendars({ calendars }: { calendars: typeof data.calendars }) {
  const [selectedItems, setSelectedItems] = React.useState<Record<string, boolean>>({})
  const [collapsedSections, setCollapsedSections] = React.useState<Record<string, boolean>>({})

  const handleCheckboxChange = (item: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }))
  }

  const toggleSection = (sectionName: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }))
  }

  return (
    <div className="p-4">
      {calendars.map((calendar) => (
        <div key={calendar.name}>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection(calendar.name)}
          >
            <h3 className="font-bold">{calendar.name}</h3>
            {collapsedSections[calendar.name] ? <ChevronRight /> : <ChevronDown />}
          </div>
          {!collapsedSections[calendar.name] && (
            <div className="space-y-2 mt-2">
              {calendar.items.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Checkbox
                    checked={!!selectedItems[item]}
                    onCheckedChange={() => handleCheckboxChange(item)}
                    id={item}
                  />
                  <label htmlFor={item}>{item}</label>
                </div>
              ))}
            </div>
          )}
          <SidebarSeparator className="my-2" />
        </div>
      ))}
    </div>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <Calendars calendars={data.calendars} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
