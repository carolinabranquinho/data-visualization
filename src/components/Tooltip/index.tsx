import { Box } from '@mui/material'
import './style.css'

export default function Tooltip({
  x,
  y,
  children,
}: {
  x: number
  y: number
  children: React.ReactNode
}) {
  return (
    <Box
      className="tooltipContainer"
      style={{
        top: `${y}px`,
        left: `${x + 15}px`,
      }}
    >
      {children}
    </Box>
  )
}
