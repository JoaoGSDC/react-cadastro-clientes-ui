import React from "react";
import { BreadcrumbContainer } from "./styles";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../assets/styles/module/buttons";

function Breadcrumb() {
  const location = useLocation();
  const pathname = location.pathname.replace("-", " ");
  const route = pathname.replaceAll("/", " / ");

  return (
    <>
      <BreadcrumbContainer>
        {location.pathname === "/" ? (
          <Link to="clientes">
            <Button>Cadastrar cliente</Button>
          </Link>
        ) : (
          <span>Cadastro{route}</span>
        )}
      </BreadcrumbContainer>
    </>
  );
}

export default Breadcrumb;
