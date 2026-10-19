import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

// Ako je u pitanju kreiranje, cabinToEdit je prazan objekat {}, pa je editId "undefined" a editValues prazan objekat {}.
// Razdvojili smo cabinToEdit na editId i editValues, jer nam je editId potreban da bismo znali da li je u pitanju kreiranje ili editovanje
// Boolean(...) pretvara bilo koju vrednost u true ili false, prema tome da li je “truthy” ili “falsy”. Vrednost undefined je falsy.
function CreateCabinForm({cabinToEdit = {}, setShowForm}) {
  const  {isCreating, createCabin} = useCreateCabin();
  const {isEditing, editCabin} = useEditCabin();
  const isWorking = isCreating || isEditing;
  const {id: editId, ...editValues} = cabinToEdit;
  const isEditSession = Boolean(editId);
  const {register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEditSession ? editValues : {}
  });
  const { errors } = formState;

  

  function onSubmittt(data) {
    // ako je "string" onda je data.image is defaultValues pri editovanju: 
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if(isEditSession) editCabin(
      {newCabinData: {...data, image}, id: editId},
      {
        onSuccess: () => { 
          reset();
        },  
      }
    );
    else createCabin(
      {...data, image: image},
      {
        onSuccess: () => { 
          reset();
        },  
      }
    ),
    setTimeout(() => {
        setShowForm?.(false);
    }, 3000);
  }

  function onErrorrr(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmittt, onErrorrr)}>
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
          setValueAs: (value) => (value === "" ? 0 : Number(value)),
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
