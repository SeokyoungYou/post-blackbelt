import { INPUT_MAX_LEN } from "../../constants/user-inputs-constants";
import ValueInput from "./inputs/ValueInput";
import TitleInputForm from "./TitleInputForm";

export default function MultiLineForm({ title, text, setText }) {
  const multiInputProp = {
    maxLength: INPUT_MAX_LEN.MULTI_LINE,
    multiline: true,
  };

  return (
    <TitleInputForm title={title}>
      <ValueInput
        text={text}
        setText={setText}
        placeholder={title}
        inputProp={multiInputProp}
      />
    </TitleInputForm>
  );
}
