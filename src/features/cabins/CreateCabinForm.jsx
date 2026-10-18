import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { createEditCabin } from "../../services/apiCabins";

// Ako je u pitanju kreiranje, cabinToEdit je prazan objekat {}, pa je editId "undefined" a editValues prazan objekat {}.
// Razdvojili smo cabinToEdit na editId i editValues, jer nam je editId potreban da bismo znali da li je u pitanju kreiranje ili editovanje
// Boolean(...) pretvara bilo koju vrednost u true ili false, prema tome da li je “truthy” ili “falsy”. Vrednost undefined je falsy.
function CreateCabinForm({cabinToEdit = {}, setShowForm}) {
  const {id: editId, ...editValues} = cabinToEdit;
  const isEditSession = Boolean(editId);
  const {register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEditSession ? editValues : {}
  });
  const { errors } = formState;
  const queryClient = useQueryClient();

  const {mutate: createCabin, isPending: isCreating} = useMutation({
    mutationFn: newCabin => createEditCabin(newCabin),
    onSuccess: () => {
      toast.success("Cabin successfully created/edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message)
  })

  const {mutate: editCabin, isPending: isEditing} = useMutation({
    // ova fja unutar mutationFn moze da primi samo JEDAN argument(zato smo stavili OBJEKAT)
    mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message)
  })

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    // console.log("data:", data);
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if(isEditSession) editCabin({newCabinData: {...data, image}, id: editId});
    else createCabin({...data, image: image});
    setTimeout(() => {
        setShowForm?.(false);
      }, 3000);
    
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isWorking} {...register("name", { 
          required: "This field is required" 
          })} 
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isWorking} {...register("maxCapacity", { 
          required: "This field is required", 
          min: {
            value: 1, 
            message: "Capacity must be at least 1"
          } 
        })} 
      />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isWorking} {...register("regularPrice", { 
          required: "This field is required", 
          min: {
            value: 0,
            message: "Price must be at least 0"
          }
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} disabled={isWorking} {...register("discount", { 
          required: "This field is required", 
          validate: (value) => Number(value) <= Number(getValues("regularPrice")) || "Discount must be less than or equal to regular price"
        })} />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="text" id="description" defaultValue="" disabled={isWorking} {...register("description", { 
          required: "This field is required" 
        })} 
      />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" disabled={isWorking} {...register("image", { 
          required: isEditSession ? false : "This field is required" 
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
