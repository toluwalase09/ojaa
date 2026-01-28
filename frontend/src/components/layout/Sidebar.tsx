
import React from 'react';
import { 
  Bot, Activity, Wallet, Settings, ChevronRight, ChevronLeft, Home,
  TrendingUp, BarChart3, DollarSign, Zap, Timer, CreditCard, PieChart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
}

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
}

export function Sidebar({ isCollapsed, onToggle, className }: SidebarProps) {
  const router = useRouter();
  
  const navItems = [
    {
      title: 'Dashboard',
      icon: Home,
      href: '/dashboard',
    },
    {
      title: 'Trading Bots',
      icon: Bot,
      href: '/bots',
    },
    {
      title: 'Platforms',
      icon: Zap,
      href: '/platforms',
    },
    {
      title: 'Wallet & Transfers',
      icon: Wallet,
      href: '/wallet',
    },
    {
      title: 'Timeframes',
      icon: Timer,
      href: '/timeframes',
    },
    {
      title: 'Analysis',
      icon: PieChart,
      href: '/analysis',
    },
    {
      title: 'Performance',
      icon: TrendingUp,
      href: '/performance',
    },
    {
      title: 'Settings',
      icon: Settings,
      href: '/settings',
    }
  ];

  return (
    <aside className={cn(
      "bg-sidebar text-sidebar-foreground relative transition-all duration-300 ease-in-out flex flex-col border-r border-sidebar-border h-screen",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="flex h-16 items-center justify-center border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/logo-square.svg?v=1" alt="ojaa" className="h-6 w-6" />
          <h2 className={cn(
            "font-semibold tracking-tight transition-opacity duration-200",
            isCollapsed ? "opacity-0" : "opacity-100"
          )}>
            ojaa
          </h2>
        </Link>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            "absolute right-2 text-sidebar-foreground h-8 w-8",
            isCollapsed ? "right-2" : "right-4"
          )}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <ScrollArea className="flex-1 py-4">
        {/* Sidebar nav is currently not used for the shop experience.
            Keep minimal structure here for future account/order navigation. */}
        <nav className="grid gap-1 px-2">
          {navItems.length === 0 && (
            <div className={cn(
              "rounded-md bg-sidebar-accent/20 p-3 text-xs text-sidebar-accent-foreground",
              isCollapsed ? "hidden" : "block"
            )}>
              Account navigation will live here once the ojaa customer area is ready.
            </div>
          )}
        </nav>
      </ScrollArea>
    </aside>
  );
}
