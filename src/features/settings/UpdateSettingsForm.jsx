import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';

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
  if (isPending) return <Spinner />;
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minBookingLength} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength} /> 
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxGuestsPerBooking} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
