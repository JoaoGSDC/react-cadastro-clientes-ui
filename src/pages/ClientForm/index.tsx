import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../assets/styles/module/buttons";
import { Input, Textarea } from "../../assets/styles/module/inputs";
import { Select } from "../../assets/styles/module/selects";
import { IClient } from "../../interfaces/IClient";
import api from "../../services/api";
import InputMask from "react-input-mask";
import {
  BottomFields,
  ButtonsContainer,
  CheckboxContainer,
  Container,
  FieldContainer,
  Fields,
  FooterButtons,
  InputMaskContainer,
} from "./styles";

function ClientForm() {
  const navigate = useNavigate();
  const params = useParams();

  const defaultValues: IClient = {
    active: true,
    address: "",
    addressNumber: "",
    apelido: "",
    cei: "",
    cel: "",
    celResponsible: "",
    city: "",
    cityResponsible: "",
    cnh: "",
    complement: "",
    contribuinte: "n",
    dataOfBirthdate: "",
    dataOfBirthdateResponsible: "",
    document: "",
    documentResponsible: "",
    email: "",
    emailResponsible: "",
    issuer: "",
    maritalStatus: "1",
    name: "",
    nameResponsible: "",
    neighborhood: "",
    observation: "",
    personType: "j",
    registerCity: "",
    registerDocument: "",
    registerState: "",
    security: "",
    tel: "",
    telResponsible: "",
    uf: "",
    ufDocument: "",
    zipCode: "",
    zipCodeResponsible: "",
  };

  const { register, handleSubmit, reset } = useForm({ defaultValues });
  const [typePerson, setTypePerson] = useState("j");
  const [brasilianStates, setBrasilianStates] = useState([]);
  const [marialStatuses, setMaritalStatuses] = useState([]);

  useEffect(() => {
    const handleGetClient = async () => {
      await api
        .get(`/clients?id=${params.id}`)
        .then((response) => reset(response.data[0]));
    };

    if (params.id) {
      handleGetClient();
    }
  }, []);

  useEffect(() => {
    const handleSetBrasilianStatesValue = async () => {
      await api
        .get("/estados")
        .then((response) => setBrasilianStates(response.data));
    };

    const handleSetMaritalStatusesValue = async () => {
      await api
        .get("/maritalStatus")
        .then((response) => setMaritalStatuses(response.data));
    };

    handleSetBrasilianStatesValue();
    handleSetMaritalStatusesValue();
  }, []);

  async function handleSubmitForm(dataValue: any) {
    if (params.id) {
      await api
        .put(`/clients/${params.id}`, dataValue)
        .then(() => navigate("/clientes"));

      return;
    }

    await api.post("/clients", dataValue).then(() => navigate("/clientes"));
  }

  return (
    <Container>
      <h3>Adicionar Novo Cliente</h3>

      <form onSubmit={handleSubmit((data: any) => handleSubmitForm(data))}>
        <div>
          <FieldContainer>
            <h4>Tipo</h4>
            <div
              onChange={() => setTypePerson((tp) => (tp === "j" ? "f" : "j"))}
            >
              <input
                type="radio"
                {...register("personType")}
                value="j"
                name="personType"
              />{" "}
              Pessoa Jurídica
              <input
                type="radio"
                {...register("personType")}
                value="f"
                name="personType"
              />{" "}
              Pessoa Física
            </div>
          </FieldContainer>

          <Fields>
            <FieldContainer flex={50}>
              {typePerson === "j" ? (
                <h4>Razão Social</h4>
              ) : (
                <h4>Nome Completo</h4>
              )}
              <Input
                type="text"
                {...register("name", { required: "Campo obrigatório" })}
                required
              />
            </FieldContainer>

            <FieldContainer flex={50}>
              {typePerson === "j" ? <h4>Nome Fantasia</h4> : <h4>Apelido</h4>}
              <Input type="text" {...register("apelido")} />
            </FieldContainer>

            <FieldContainer flex={0}>
              <CheckboxContainer>
                <input type="checkbox" {...register("active")} />
                <span>Ativo</span>
              </CheckboxContainer>
            </FieldContainer>
          </Fields>

          <Fields>
            <FieldContainer flex={25}>
              {typePerson === "j" ? (
                <>
                  <h4>CNPJ</h4>
                  <InputMaskContainer>
                    <InputMask
                      mask="99.999.999/9999-99"
                      placeholder="00.000.000/0000-00"
                      {...register("document", {
                        required: "Campo obrigatório",
                      })}
                      required
                    />
                  </InputMaskContainer>
                </>
              ) : (
                <>
                  <h4>CPF</h4>
                  <InputMaskContainer>
                    <InputMask
                      mask="999.999.999-99"
                      placeholder="000.000.000-00"
                      {...register("document", {
                        required: "Campo obrigatório",
                      })}
                      required
                    />
                  </InputMaskContainer>
                </>
              )}
            </FieldContainer>

            {typePerson === "j" ? (
              <FieldContainer flex={25}>
                <h4>Contribuinte</h4>
                <div>
                  <input
                    type="radio"
                    {...register("contribuinte")}
                    value="s"
                    name="contribuinte"
                  />{" "}
                  Sim
                  <input
                    type="radio"
                    {...register("contribuinte")}
                    value="n"
                    name="contribuinte"
                  />{" "}
                  Não
                </div>
              </FieldContainer>
            ) : (
              <>
                <FieldContainer flex={25}>
                  <h4>Data de Nascimento</h4>
                  <Input type="date" {...register("dataOfBirthdate")} />
                </FieldContainer>

                <FieldContainer flex={25}>
                  <h4>Estado Civil</h4>
                  <Select {...register("maritalStatus")}>
                    {marialStatuses.map((status: any) => (
                      <option key={status.id} value={status.id}>
                        {status.description}
                      </option>
                    ))}
                  </Select>
                </FieldContainer>
              </>
            )}
          </Fields>

          <Fields>
            {typePerson === "j" ? (
              <>
                <FieldContainer flex={25}>
                  <h4>Insc. Estadual</h4>
                  <Input type="text" {...register("registerState")} />
                </FieldContainer>

                <FieldContainer flex={25}>
                  <h4>Insc. Municipal</h4>
                  <Input type="text" {...register("registerCity")} />
                </FieldContainer>
              </>
            ) : (
              <>
                <FieldContainer flex={25}>
                  <h4>RG/RNE</h4>
                  <Input type="text" {...register("registerDocument")} />
                </FieldContainer>

                <FieldContainer flex={25}>
                  <h4>Órgão Emissor</h4>
                  <Input type="text" {...register("issuer")} />
                </FieldContainer>

                <FieldContainer flex={10}>
                  <h4>UF</h4>
                  <Select {...register("ufDocument")}>
                    {brasilianStates.map((state: any) => (
                      <option key={state.uf} value={state.uf}>
                        {state.uf}
                      </option>
                    ))}
                  </Select>
                </FieldContainer>
              </>
            )}
          </Fields>

          {typePerson === "f" ? (
            <>
              <Fields>
                <FieldContainer flex={25}>
                  <h4>CNH</h4>
                  <Input type="text" {...register("cnh")} />
                </FieldContainer>

                <FieldContainer flex={25}>
                  <h4>Segurança</h4>
                  <Input type="text" {...register("security")} />
                </FieldContainer>

                <FieldContainer flex={25}>
                  <h4>CEI</h4>
                  <Input type="text" {...register("cei")} />
                </FieldContainer>
              </Fields>
            </>
          ) : (
            <></>
          )}

          <Fields>
            <FieldContainer flex={50}>
              <h4>Email</h4>
              <Input
                type="email"
                {...register("email", { required: "Campo obrigatório" })}
                required
              />
            </FieldContainer>
          </Fields>

          {typePerson === "f" ? (
            <>
              <Fields>
                <FieldContainer flex={25}>
                  <h4>Telefone</h4>
                  <Input type="text" {...register("tel")} />
                </FieldContainer>

                <FieldContainer flex={25}>
                  <h4>Celular</h4>
                  <Input type="text" {...register("cel")} />
                </FieldContainer>
              </Fields>
            </>
          ) : (
            <></>
          )}
        </div>

        <BottomFields>
          {typePerson === "j" ? (
            <>
              <Fields>
                <FieldContainer flex={50}>
                  <h4>Nome do responsável</h4>
                  <Input type="text" {...register("nameResponsible")} />
                </FieldContainer>
              </Fields>

              <Fields>
                <FieldContainer flex={25}>
                  <h4>CPF</h4>
                  <InputMaskContainer>
                    <InputMask
                      mask="999.999.999-99"
                      placeholder="000.000.000-00"
                      {...register("documentResponsible", {
                        required: "Campo obrigatório",
                      })}
                      required
                    />
                  </InputMaskContainer>
                </FieldContainer>

                <FieldContainer flex={25}>
                  <h4>Data Nasc. Responsável</h4>
                  <Input
                    type="date"
                    {...register("dataOfBirthdateResponsible")}
                  />
                </FieldContainer>
              </Fields>

              <Fields>
                <FieldContainer flex={25}>
                  <h4>Telefone</h4>
                  <Input type="tel" {...register("telResponsible")} />
                </FieldContainer>

                <FieldContainer flex={25}>
                  <h4>Celular</h4>
                  <Input type="tel" {...register("celResponsible")} />
                </FieldContainer>

                <FieldContainer flex={50}>
                  <h4>Email Responsável</h4>
                  <Input type="email" {...register("emailResponsible")} />
                </FieldContainer>
              </Fields>
            </>
          ) : (
            <></>
          )}

          <Fields>
            <FieldContainer flex={25}>
              <h4>CEP</h4>
              <Input
                type="text"
                {...register("zipCode", { required: "Campo obrigatório" })}
                required
              />
            </FieldContainer>

            <FieldContainer flex={50}>
              <h4>Cidade</h4>
              <Input
                type="tel"
                {...register("city", { required: "Campo obrigatório" })}
                required
              />
            </FieldContainer>

            <FieldContainer flex={10}>
              <h4>UF</h4>
              <Select
                {...register("uf", { required: "Campo obrigatório" })}
                required
              >
                {brasilianStates.map((state: any) => (
                  <option key={state.uf} value={state.uf}>
                    {state.description}
                  </option>
                ))}
              </Select>
            </FieldContainer>
          </Fields>

          <Fields>
            <FieldContainer flex={50}>
              <h4>Endereço</h4>
              <Input
                type="text"
                {...register("address", { required: "Campo obrigatório" })}
                required
              />
            </FieldContainer>

            <FieldContainer flex={10}>
              <h4>Número</h4>
              <Input
                type="text"
                {...register("addressNumber", {
                  required: "Campo obrigatório",
                })}
                required
              />
            </FieldContainer>
          </Fields>

          <Fields>
            <FieldContainer flex={25}>
              <h4>Complemento</h4>
              <Input type="text" {...register("complement")} />
            </FieldContainer>

            <FieldContainer flex={50}>
              <h4>Bairro</h4>
              <Input
                type="text"
                {...register("neighborhood", { required: "Campo obrigatório" })}
                required
              />
            </FieldContainer>
          </Fields>

          <FieldContainer flex={100}>
            <h4>Observação</h4>
            <Textarea {...register("observation")} />
          </FieldContainer>
        </BottomFields>

        <FooterButtons>
          <ButtonsContainer>
            <Button type="submit" backgroudColor="#27cfbd">
              Salvar
            </Button>

            <Button
              type="button"
              backgroudColor="#ea3f7a"
              onClick={() => navigate("/clientes")}
            >
              Cancelar
            </Button>
          </ButtonsContainer>
        </FooterButtons>
      </form>
    </Container>
  );
}

export default ClientForm;
