import { cn } from "@/lib/utils"
import { Separator as ShadSeparator } from "./ui/separator"

interface SeparatorProps {
    className?: string
}

export const Separator: React.FC<SeparatorProps> = ({ className }) => {
    return (
        <ShadSeparator className={cn(`dark:bg-white/10`, className)} />
    )
} 