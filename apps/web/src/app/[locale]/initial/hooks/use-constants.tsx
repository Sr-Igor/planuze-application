import {
  BarChart3,
  Bell,
  Clock,
  DollarSign,
  FileText,
  Globe,
  Kanban,
  Key,
  Settings,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";

import { useLang } from "@repo/language/hook";

export const useLpConstants = () => {
  const t = useLang();

  const features = [
    {
      icon: Kanban,
      title: t.page.lp("features.kanban.title"),
      description: t.page.lp("features.kanban.description"),
    },
    {
      icon: Users,
      title: t.page.lp("features.team.title"),
      description: t.page.lp("features.team.description"),
    },
    {
      icon: DollarSign,
      title: t.page.lp("features.financial.title"),
      description: t.page.lp("features.financial.description"),
    },
    {
      icon: Clock,
      title: t.page.lp("features.time.title"),
      description: t.page.lp("features.time.description"),
    },
    {
      icon: Shield,
      title: t.page.lp("features.security.title"),
      description: t.page.lp("features.security.description"),
    },
    {
      icon: Globe,
      title: t.page.lp("features.international.title"),
      description: t.page.lp("features.international.description"),
    },
    {
      icon: Key,
      title: t.page.lp("features.integration.title"),
      description: t.page.lp("features.integration.description"),
    },
    {
      icon: BarChart3,
      title: t.page.lp("features.reports.title"),
      description: t.page.lp("features.reports.description"),
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: t.page.lp("benefits.productivity.title"),
      description: t.page.lp("benefits.productivity.description"),
    },
    {
      icon: FileText,
      title: t.page.lp("benefits.control.title"),
      description: t.page.lp("benefits.control.description"),
    },
    {
      icon: Bell,
      title: t.page.lp("benefits.notifications.title"),
      description: t.page.lp("benefits.notifications.description"),
    },
    {
      icon: Settings,
      title: t.page.lp("benefits.customization.title"),
      description: t.page.lp("benefits.customization.description"),
    },
  ];

  const steps = [
    {
      number: "1",
      title: t.page.lp("steps.create.title"),
      description: t.page.lp("steps.create.description"),
    },
    {
      number: "2",
      title: t.page.lp("steps.organize.title"),
      description: t.page.lp("steps.organize.description"),
    },
    {
      number: "3",
      title: t.page.lp("steps.track.title"),
      description: t.page.lp("steps.track.description"),
    },
    {
      number: "4",
      title: t.page.lp("steps.analyze.title"),
      description: t.page.lp("steps.analyze.description"),
    },
  ];

  return {
    features,
    benefits,
    steps,
  };
};
