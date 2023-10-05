import { DesktopIcon, DotsVerticalIcon, LaptopIcon, MobileIcon } from "@radix-ui/react-icons";
import { includes, map, toUpper } from "lodash";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../radix-ui";
import { useCanvasWidth, useSelectedBreakpoints } from "../../../hooks";

interface BreakpointItemType {
  breakpoint: string;
  content: string;
  icon: any;
  title: string;
  width: number;
}

interface BreakpointCardProps extends BreakpointItemType {
  currentBreakpoint: string;
  onClick: Function;
}

const TabletIcon = ({ landscape = false }) => (
  <svg
    className={landscape ? "rotate-90" : ""}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 13 13"
    xmlSpace="preserve"
    width={13}
    height={13}>
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M10.65 0H2.349a.851.851 0 0 0-.851.852v11.299c0 .47.382.852.851.852h8.3a.851.851 0 0 0 .851-.852V.852A.851.851 0 0 0 10.65 0zM6.599 12.466a.367.367 0 1 1 0-.735.367.367 0 0 1 0 .735zm3.9-1.267H2.5V1h8.001v10.199z"
      style={{
        fill: "#000",
      }}
    />
  </svg>
);

const BREAKPOINTS: BreakpointItemType[] = [
  {
    title: "Mobile (XS)",
    content: "Styles set here are applied to all screen unless edited at higher breakpoint",
    breakpoint: "xs",
    icon: <MobileIcon />,
    width: 400,
  },
  {
    title: "Mobile landscape (SM)",
    content: "Styles set here are applied at 640px and up unless edited at higher breakpoint",
    breakpoint: "sm",
    icon: <MobileIcon className="rotate-90" />,
    width: 640,
  },
  {
    title: "Tablet (MD)",
    content: "Styles set here are applied at 768px and up",
    breakpoint: "md",
    icon: <TabletIcon />,
    width: 800,
  },
  {
    title: "Tablet Landscape (LG)",
    content: "Styles set here are applied at 1024px and up unless edited at higher breakpoint",
    breakpoint: "lg",
    icon: <TabletIcon landscape />,
    width: 1024,
  },
  {
    title: "Desktop (XL)",
    content: "Styles set here are applied at 1280px and up unless edited at higher breakpoint",
    breakpoint: "xl",
    icon: <LaptopIcon />,
    width: 1420,
  },
  {
    title: "Large Desktop (2XL)",
    content: "Styles set here are applied at 1536px and up",
    breakpoint: "2xl",
    icon: <DesktopIcon />,
    width: 1920,
  },
];

const BreakpointCard = ({
  title,
  content,
  currentBreakpoint,
  breakpoint,
  width,
  icon,
  onClick,
}: BreakpointCardProps) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Button
        onClick={() => onClick(width)}
        size="sm"
        variant={breakpoint === currentBreakpoint ? "secondary" : "ghost"}>
        {icon}
      </Button>
    </HoverCardTrigger>
    <HoverCardContent className="w-52 border-border">
      <div className="flex justify-between space-x-4">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{title}</h4>
          <p className="text-xs">{content}</p>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);

export const Breakpoints = () => {
  const [, breakpoint, setNewWidth] = useCanvasWidth();
  const [selectedBreakpoints, setSelectedBreakpoints] = useSelectedBreakpoints();

  const toggleBreakpoint = (newBreakPoint: string) => {
    if (selectedBreakpoints.includes(newBreakPoint)) {
      if (selectedBreakpoints.length > 2) {
        setSelectedBreakpoints(selectedBreakpoints.filter((bp) => bp !== newBreakPoint));
      }
    } else {
      setSelectedBreakpoints((prevSelected: string[]) => [...prevSelected, newBreakPoint]);
    }
  };

  return (
    <div className="flex items-center rounded-md">
      {map(
        BREAKPOINTS.filter((bp: BreakpointItemType) => includes(selectedBreakpoints, toUpper(bp.breakpoint))),
        (bp: BreakpointItemType) => (
          <BreakpointCard {...bp} onClick={setNewWidth} key={bp.breakpoint} currentBreakpoint={breakpoint} />
        ),
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className="cursor-pointer px-2.5 hover:opacity-80">
            <DotsVerticalIcon className="scale-90 transform" />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 border-border text-xs">
          <DropdownMenuLabel>Breakpoints</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {map(BREAKPOINTS, (bp: BreakpointItemType) => (
            <DropdownMenuCheckboxItem
              key={bp.breakpoint}
              disabled={bp.breakpoint === "xs"}
              onCheckedChange={() => toggleBreakpoint(toUpper(bp.breakpoint))}
              checked={includes(selectedBreakpoints, toUpper(bp.breakpoint))}>
              {bp.title}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
