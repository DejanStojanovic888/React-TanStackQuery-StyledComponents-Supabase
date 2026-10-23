import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSettings';

// useQuery() uvek vraća validan JavaScript OBJEKAT čim se komponenta učita.

// Taj objekat odmah u startu izgleda otprilike ovako:
// {
//   data: undefined,
//   isPending: true,
//   isLoading: true,
//   error: null,
//   // ... mnoga druga svojstva
// }

function UpdateSettingsForm() {
  // ovo = {} moramo da postavimo jer smo  koristili komandu .single() u apiSettings.js a ta komanda vraca OBJEKAT iz baze. Zato pri inicijalnom ucitavanju dobijamo gresku jer dokomponujemo a podaci su undefined
  const {
    isPending,
    settings: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {}
  } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();
  if (isPending) return <Spinner />;

  function handleUpdate(e, field) {
    const {value} = e.target;
    if(!value) return;
    updateSetting({[field]: Number(value) });
  }
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' disabled={isUpdating} defaultValue={minBookingLength} onBlur={(e) => handleUpdate(e, 'minBookingLength')} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' disabled={isUpdating} defaultValue={maxBookingLength} onBlur={(e) => handleUpdate(e, 'maxBookingLength')} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' disabled={isUpdating} defaultValue={maxGuestsPerBooking} onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' disabled={isUpdating} defaultValue={breakfastPrice} onBlur={(e) => handleUpdate(e, 'breakfastPrice')} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
