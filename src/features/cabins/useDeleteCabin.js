import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
    const queryClient = useQueryClient();
    const {isPending: isDeleting, mutate: deleteCabin} = useMutation({
        // mutationFn: (id) => deleteCabin(id), je isto kao ovo dole
        mutationFn: deleteCabinApi,
        onSuccess: () => {
            toast.success("Cabin deleted successfully");
            queryClient.invalidateQueries({
                queryKey: ["cabins"] 
            });
        },
        onError: (err) => toast.error(err.message)
    });
    return { isDeleting, deleteCabin };
}
