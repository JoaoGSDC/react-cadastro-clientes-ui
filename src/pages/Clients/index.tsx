import React, { useCallback, useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { FiUserX, FiPlusCircle } from "react-icons/fi";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { Button } from "../../assets/styles/module/buttons";
import api from "../../services/api";
import { Link } from "react-router-dom";
import {
  Container,
  SearchContainer,
  Table,
  ButtonNewClientContainer,
} from "./styles";
import { IClient } from "../../interfaces/IClient";
import InputSearch from "../../components/InputSearch";

function Clients() {
  const [order, setOrder] = useState<number>(0);
  const [clients, setClients] = useState<IClient[]>([] as IClient[]);

  const handleGetAllClients = useCallback(async () => {
    await api.get("/clients").then((response) => {
      setClients(response.data);
    });
  }, []);

  useEffect(() => {
    handleGetAllClients();
  }, [handleGetAllClients]);

  async function handleDeleteClient(id: number) {
    await api.delete(`/clients/${id}`).then(() => {
      window.alert("Deletado com sucesso!");
      handleGetAllClients();
    });
  }

  async function handleSearch(searchValue: string) {
    if (searchValue === "") {
      handleGetAllClients();
      return;
    }

    await api.get(`/clients?name=${searchValue}`).then((response) => {
      setClients(response.data);
    });
  }

  async function handleOrderByTable() {
    let ord = 0;

    if (order === 0) {
      setOrder(1);
      ord = 1;
    } else if (order === 1) {
      setOrder(2);
      ord = 2;
    } else {
      setOrder(0);
    }

    if (ord === 1) {
      await api.get("/clients?_sort=name&_order=asc").then((response) => {
        setClients(response.data);
      });

      return;
    }

    if (ord === 2) {
      await api.get("/clients?_sort=name&_order=desc").then((response) => {
        setClients(response.data);
      });

      return;
    }

    handleGetAllClients();
  }

  return (
    <Container>
      <ButtonNewClientContainer>
        <Link to="cadastrar-cliente">
          <Button>
            <FiPlusCircle />
            Cliente
          </Button>
        </Link>
      </ButtonNewClientContainer>

      <SearchContainer>
        <InputSearch
          onChange={(event: any) => handleSearch(event.target.value)}
        />
      </SearchContainer>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={() => handleOrderByTable()}>
              Nome/Razão Social
              {order === 1 ? <BsArrowUp /> : <></>}
              {order === 2 ? <BsArrowDown /> : <></>}
            </th>
            <th>CPF/CNPJ</th>
            <th>Email</th>
            <th>Tel</th>
            <th>Cel</th>
            <th></th>
          </tr>
        </thead>

        {clients.length ? (
          clients.map((client: IClient) => (
            <tbody key={client.id}>
              <tr>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.document}</td>
                <td>{client.email}</td>
                <td>{client.tel}</td>
                <td>{client.cel}</td>
                <td>
                  <Link to={`cadastrar-cliente/${client.id}`}>
                    <MdOutlineEdit />
                  </Link>

                  <span onClick={() => handleDeleteClient(Number(client.id))}>
                    <FiUserX />
                  </span>
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          <></>
        )}
      </Table>
    </Container>
  );
}

export default Clients;
