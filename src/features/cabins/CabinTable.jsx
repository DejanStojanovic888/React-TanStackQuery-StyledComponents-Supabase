import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router";

function CabinTable() {
  const { cabins, isPending, error } = useCabins();
  const [searchParams] = useSearchParams();
  
  if (isPending) return <Spinner />;
  if (error) return <p>Greška pri učitavanju kabina: {error.message}</p>;
  if (!cabins) return null;
  const filterValue = searchParams.get("discount") || "all"; // Default to "all"
  const filteredCabins = cabins.filter((cabin) => {
    if (filterValue === "has-discount") {
      return cabin.discount > 0;
    } else if (filterValue === "no-discount") {
      return cabin.discount === 0;
    } else {
      return true; // Show all cabins if no filter is applied
    }
  });
  return (
      <Menus>
        <Table columns="0.8fr 1.8fr 2.2fr 1fr 1fr 1fr">
          <Table.Header >
            <div> 
            </div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </Table.Header>

          <Table.Body 
            data={filteredCabins} 
            render={(cabin) => (
              <CabinRow cabin={cabin} key={cabin.id} /> 
            )}
            >
          </Table.Body>  
        </Table>
      </Menus>
  )
}

export default CabinTable
