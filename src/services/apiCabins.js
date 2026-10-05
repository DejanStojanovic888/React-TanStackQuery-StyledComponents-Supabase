import supabase from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')
    if (error) {
        console.error(error);
        throw new Error('Cabins could not get loaded');
    }
    return data;
}

export async function deleteCabin(cabinId) {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', cabinId)
    if (error) {
        console.error(error);
        throw new Error('Cabin could not be deleted');
    }
    return data
}