"use client"

import * as React from "react"
import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import { ChevronDown, Calendar, Music, Users, Briefcase, PartyPopper, Heart, GraduationCap, Film } from "lucide-react"

// Utility function for className merging
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

// Custom hook for click outside detection
function useClickAway(ref: React.RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void) {
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler])
}

// Types
interface EventType {
  id: string
  label: string
  icon: React.ElementType
  color: string
}

const eventTypes: EventType[] = [
  { id: "all", label: "Alle Event-Typen", icon: Calendar, color: "#A06CD5" },
  { id: "konzert", label: "Konzert & Live-Musik", icon: Music, color: "#FF6B6B" },
  { id: "firmenevent", label: "Firmenevent", icon: Briefcase, color: "#4ECDC4" },
  { id: "hochzeit", label: "Hochzeit", icon: Heart, color: "#F9C74F" },
  { id: "geburtstag", label: "Geburtstag & Private Feiern", icon: PartyPopper, color: "#45B7D1" },
  { id: "messe", label: "Messe & Ausstellung", icon: Users, color: "#95E1D3" },
  { id: "galanacht", label: "Gala-Abend", icon: Film, color: "#FFB6C1" },
  { id: "abschlussfeier", label: "Abschlussfeier", icon: GraduationCap, color: "#DDA15E" },
]

// Icon wrapper with animation
const IconWrapper = ({
  icon: Icon,
  isHovered,
  color,
}: { icon: React.ElementType; isHovered: boolean; color: string }) => (
  <motion.div 
    className="w-4 h-4 mr-2 relative" 
    initial={false} 
    animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
  >
    <Icon className="w-4 h-4" />
    {isHovered && (
      <motion.div
        className="absolute inset-0"
        style={{ color }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Icon className="w-4 h-4" strokeWidth={2} />
      </motion.div>
    )}
  </motion.div>
)

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

interface EventTypeDropdownProps {
  value: string
  onChange: (value: string) => void
}

export function EventTypeDropdown({ value, onChange }: EventTypeDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedEventType, setSelectedEventType] = React.useState<EventType>(
    eventTypes.find(e => e.id === value) || eventTypes[0]
  )
  const [hoveredEventType, setHoveredEventType] = React.useState<string | null>(null)
  const dropdownRef = React.useRef<HTMLDivElement | null>(null)

  useClickAway(dropdownRef, () => setIsOpen(false))

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  const handleSelect = (eventType: EventType) => {
    setSelectedEventType(eventType)
    onChange(eventType.label)
    setIsOpen(false)
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="w-full relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full justify-between bg-input text-foreground border border-border rounded-md",
            "hover:bg-input/80 hover:border-primary/50",
            "focus:outline-none focus:ring-2 focus:ring-primary",
            "transition-all duration-200 ease-in-out px-3 py-2",
            "flex items-center h-10 text-sm",
            isOpen && "ring-2 ring-primary",
          )}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="flex items-center">
            <IconWrapper 
              icon={selectedEventType.icon} 
              isHovered={false} 
              color={selectedEventType.color} 
            />
            {selectedEventType.label}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center w-5 h-5"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 1, y: 0, height: 0 }}
              animate={{
                opacity: 1,
                y: 0,
                height: "auto",
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 1,
                },
              }}
              exit={{
                opacity: 0,
                y: 0,
                height: 0,
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 1,
                },
              }}
              className="absolute left-0 right-0 top-full mt-2 z-50"
              onKeyDown={handleKeyDown}
            >
              <motion.div
                className="w-full rounded-lg border border-border bg-card p-1 shadow-lg"
                initial={{ borderRadius: 8 }}
                animate={{
                  borderRadius: 12,
                  transition: { duration: 0.2 },
                }}
                style={{ transformOrigin: "top" }}
              >
                <motion.div 
                  className="py-2 relative max-h-[300px] overflow-y-auto" 
                  variants={containerVariants} 
                  initial="hidden" 
                  animate="visible"
                >
                  <motion.div
                    layoutId="hover-highlight"
                    className="absolute inset-x-1 bg-muted rounded-md"
                    animate={{
                      y: eventTypes.findIndex((c) => (hoveredEventType || selectedEventType.id) === c.id) * 40 +
                        (eventTypes.findIndex((c) => (hoveredEventType || selectedEventType.id) === c.id) > 0 ? 20 : 0),
                      height: 40,
                    }}
                    transition={{
                      type: "spring",
                      bounce: 0.15,
                      duration: 0.5,
                    }}
                  />
                  {eventTypes.map((eventType, index) => (
                    <React.Fragment key={eventType.id}>
                      {index === 1 && (
                        <motion.div 
                          className="mx-4 my-2.5 border-t border-border" 
                          variants={itemVariants} 
                        />
                      )}
                      <motion.button
                        type="button"
                        onClick={() => handleSelect(eventType)}
                        onHoverStart={() => setHoveredEventType(eventType.id)}
                        onHoverEnd={() => setHoveredEventType(null)}
                        className={cn(
                          "relative flex w-full items-center px-4 py-2.5 text-sm rounded-md",
                          "transition-colors duration-150",
                          "focus:outline-none",
                          selectedEventType.id === eventType.id || hoveredEventType === eventType.id
                            ? "text-foreground"
                            : "text-muted-foreground",
                        )}
                        whileTap={{ scale: 0.98 }}
                        variants={itemVariants}
                      >
                        <IconWrapper
                          icon={eventType.icon}
                          isHovered={hoveredEventType === eventType.id}
                          color={eventType.color}
                        />
                        {eventType.label}
                      </motion.button>
                    </React.Fragment>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}
