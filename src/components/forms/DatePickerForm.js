import DatePickerInput from "./inputs/DatePickerInput";
import TitleInputForm from "./TitleInputForm";

export default function DatePickerForm({ title, text, setText }) {
  return (
    <TitleInputForm title={title}>
      <DatePickerInput text={text} setText={setText} placeholder={title} />
    </TitleInputForm>
  );
}
