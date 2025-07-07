import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion" // Radix UI primitives for accessible accordion
import { ChevronDown } from "lucide-react" // Icon for the accordion arrow

import { cn } from "@/lib/utils" // Utility for conditional classNames

// Root Accordion component, just a re-export from Radix
const Accordion = AccordionPrimitive.Root

// AccordionItem: Represents a single item/section in the accordion
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)} // Adds a bottom border and merges any custom classes
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

// AccordionTrigger: The clickable header that toggles the accordion section
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        // Styles for layout, hover, and icon rotation when open
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      {/* Chevron icon rotates when the section is open */}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

// AccordionContent: The collapsible content area for each accordion item
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    // Animates open/close and hides overflow
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    {/* Padding for content, merges any custom classes */}
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

// Export all accordion components for use in other files
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
