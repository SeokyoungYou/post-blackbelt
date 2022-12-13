import DropdownPickerInput from "./inputs/DropdownPickerInput";
import TitleInputForm from "./TitleInputForm";

export default function DropdownPickerForm({
  title,
  text,
  setText,
  pickerItem,
}) {
  return (
    <TitleInputForm title={title}>
      <DropdownPickerInput
        text={text}
        setText={setText}
        pickerItem={pickerItem}
      />
    </TitleInputForm>
  );
}
