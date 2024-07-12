import Details from "./page";
import { RoomProvider } from "@/context/RoomContext";

const DetailsPage = ({ params }: { params: {id: string} }) => {

  return (
    <RoomProvider>
        <Details  params={params} />
    </RoomProvider>
  );
}

export default DetailsPage