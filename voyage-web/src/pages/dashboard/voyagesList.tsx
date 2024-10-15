import { Button } from "@/components/ui/button";
import { useApi } from "@/providers/ApiProvider";
import { useState } from "react";

const VoyagesList = () => {
  const [voyages, setVoyages] = useState<string>()
  const { getVoyages } = useApi();
  const handleClick = async () => {
    const data = await getVoyages()
    setVoyages(JSON.stringify(data))
  }
  return (
    <>
     <Button onClick={handleClick}>Get voyages</Button>
     <p>{voyages}</p>
    </>
  )
}

export default VoyagesList;