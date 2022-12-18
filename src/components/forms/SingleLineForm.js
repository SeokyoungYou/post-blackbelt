import { INPUT_MAX_LEN } from "../../constants/user-inputs-constants";
import ValueInput from "./inputs/ValueInput";
import TitleInputForm from "./TitleInputForm";

export default function SingleLineForm({ title, text, setText }) {
  const singleInputProp = {
    maxLength: INPUT_MAX_LEN.SINGLE_LINE,
    multiline: false,
  };
  return (
    <TitleInputForm title={title}>
      <ValueInput
        text={text}
        setText={setText}
        placeholder={title}
        inputProp={singleInputProp}
      />
    </TitleInputForm>
  );
}
