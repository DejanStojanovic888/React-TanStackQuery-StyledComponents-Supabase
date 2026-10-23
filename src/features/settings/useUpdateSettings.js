import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
    const queryClient = useQueryClient();
    const {mutate: updateSetting, isPending: isUpdating} = useMutation({
        // ova fja unutar mutationFn moze da primi samo JEDAN argument(zato smo stavili OBJEKAT)
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("Setting successfully edited");
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (err) => toast.error(err.message)
    })
    return { updateSetting, isUpdating };
}