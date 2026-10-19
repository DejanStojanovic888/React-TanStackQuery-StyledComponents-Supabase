import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {

    const queryClient = useQueryClient();
    
    const {mutate: createCabin, isPending: isCreating } = useMutation({
        mutationFn: newCabin => createEditCabin(newCabin),
        onSuccess: () => {
            toast.success("Cabin successfully created/edited");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err) => toast.error(err.message)
    })
    return {createCabin, isCreating };
}