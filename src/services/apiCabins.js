import supabase, { supabaseUrl } from "./supabase";

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

// ne kreiramo novi imagePath kada editujemo. Koristimo postojeci imagePath kada editujemo.
export async function createEditCabin(newCabin, id) {
    const hasImagePath = typeof newCabin.image === 'string';
    if (!hasImagePath && !newCabin.image) {
        throw new Error('A cabin image is required');
    }

    const imageName = hasImagePath
        ? null
        : `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    let query = supabase.from('cabins');
    // 1. Create cabin:
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
    // 2. Edit cabin:
    if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
    const { data, error } = await query.select().single()

    if (error) {
        console.error(error);
        throw new Error(error.message || 'Cabin could not be saved');
    }
    // 3. Upload image(ovo se izvrsava samo ako nema errora u kreiranju kabine u bazi):
    if (hasImagePath) return data;
    const { error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)  // newCabin.image je File objekat koji je uploadovan na Supabase storage
    // 4. Delete the cabin IF there was an error uploading image:
    if (storageError) {
        console.error(storageError);
        if (!id) await supabase.from('cabins').delete().eq('id', data.id)
        throw new Error(`Cabin image could not be uploaded: ${storageError.message}`);
    }
    return data
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