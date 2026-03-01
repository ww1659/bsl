interface LoadingWheelProps {
  text: string;
}

import { Card } from "./ui/card"
import { Spinner } from "./ui/loading"

function LoadingWheel({ text }: LoadingWheelProps) {
  return (
    <Card className="flex flex-row items-center gap-2 p-4 bg-secondary">
      <Spinner size="sm" />
      <p>{text}</p>
    </Card>
  )
}

export default LoadingWheel
