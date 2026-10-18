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
    // sluzi nam da bi mogli da zadrzimo stari imagePath ako vec postoji
    // da li image ima metodu startsWith:
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    // Ovde ne smemo da zaboravimo ovaj replaceAll jer ce Supabase da kreira folder gde god ima "/":
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    let query = supabase.from('cabins');
    // 1. Create cabin:
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
    // 2. Edit cabin:
    if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

    const { data, error } = await query.select().single()

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be created');
    }
    // 3. Upload image(ovo se izvrsava samo ako nema errora u kreiranju kabine u bazi):
    const { error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)  // newCabin.image je File objekat koji je uploadovan na Supabase storage
    // 4. Delete the cabin IF there was an error uploading image:
    if (storageError) {
        console.error(storageError);
        await supabase.from('cabins').delete().eq('id', data.id)
        throw new Error('Cabin image could not be uploaded and the cabin was not created');
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