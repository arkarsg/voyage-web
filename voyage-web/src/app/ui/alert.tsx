import { AlertCircle } from "lucide-react"
import React from "react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/components/ui/alert"
  
export default function ErrorAlert({children} : React.PropsWithChildren) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {children}
      </AlertDescription>
    </Alert>
  )
}