import * as React from "react"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="rounded-lg border bg-white text-gray-950 shadow-sm"
    {...props}
  />
))
Card.displayName = "Card"

export { Card }