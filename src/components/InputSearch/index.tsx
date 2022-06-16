import React from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "../../assets/styles/module/inputs";
import { InputSearchContainer } from "./styles";

function InputSearch({ onChange }: any) {
  return (
    <>
      <InputSearchContainer>
        <Input type="text" onChange={onChange} />

        <FiSearch />
      </InputSearchContainer>
    </>
  );
}

export default InputSearch;
