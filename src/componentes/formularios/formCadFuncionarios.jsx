import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";

export default function FormCadFuncionarios(props) {
  const [validado, setValidado] = useState(false);
  const [departamentos, setDepartamentos] = useState([
    {
      codigo: 0,
      nome: "Nenhum departamento encontrado",
    },
  ]);
  const [funcionario, setFuncionario] = useState({
    codigo: "",
    nome: "",
    cargo: "",
    precoVenda: "",
    salario: "",
    DataContratacao: "",
    departamento: {},
  });

  function selecionarDepartamento(evento) {
    const codigoDepartamento = evento.currentTarget.value;
    setFuncionario({
      ...funcionario,
      departamento: {
        codigo: codigoDepartamento,
      },
    });
  }

  function buscarDepartamentos() {
    fetch("http://localhost:3001/departamento", { method: "GET" })
      .then((resposta) => resposta.json())
      .then((retorno) => {
        if (retorno.status) {
          setDepartamentos(retorno.listaDepartamentos);
        }
      })
      .catch((erro) => {
        setDepartamentos([
          {
            codigo: 0,
            nome: "Erro ao recuperar departamentos" + erro.message,
          },
        ]);
      });
  }

  useEffect(() => {
    buscarDepartamentos();
  }, []);

  function manipularMudanca(evento) {
    const componente = evento.currentTarget;
    setFuncionario({ ...funcionario, [componente.name]: componente.value });
  }

  function manipularSubmissao(evento) {
    evento.preventDefault();
    evento.stopPropagation();
    const form = evento.currentTarget;
    if (form.checkValidity() === false) {
      setValidado(true);
    } else {
      setValidado(false);
      //enviar o funcionario para o backend
      fetch("http://localhost:3001/funcionario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(funcionario),
      })
        .then((resposta) => resposta.json())
        .then((retorno) => {
          if (retorno.status) {
            alert(
              retorno.mensagem + " - código gerado: " + retorno.codigoGerado
            );
            props.setListaFuncionarios([...props.listaFuncionarios, funcionario]);
            props.setExibirTabela(true);
          } else {
            alert(retorno.mensagem);
          }
        })
        .catch((erro) => {
          alert("Erro: " + erro.message);
        });
    }
  }
  return (
    <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>Código</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="0"
            value={funcionario.codigo}
            id="codigo"
            name="codigo"
            onChange={manipularMudanca}
            disabled
          />
          <Form.Control.Feedback type="invalid">
            Por favor, informe o código do funcionario.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12">
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nome completo..."
            value={funcionario.nome}
            id="nome"
            name="nome"
            onChange={manipularMudanca}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, informe o nome do funcionario.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6">
          <Form.Label>Cargo:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Descreva o cargo..."
            id="cargo"
            name="cargo"
            value={funcionario.cargo}
            onChange={manipularMudanca}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, informe o cargo do funcionario.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Salario:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Informe o salário..."
            id="salario"
            name="salario"
            value={funcionario.salario}
            onChange={manipularMudanca}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, informe o salario.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6">
          <Form.Label>Data de Contratação:</Form.Label>
          <Form.Control
            type="date"
            placeholder=""
            required
            value={funcionario.dataContratacao}
            id="dataContratacao"
            name="dataContratacao"
            onChange={manipularMudanca}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, informe a data de Contratação do funcionário.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12">
          <Form.Label>Departamento:</Form.Label>

          <Form.Select
            id="departamento"
            nome="departamento"
            value={funcionario.departamento.codigo}
            onChange={selecionarDepartamento}
          >
            <option key={0} value={0}>
              Selecione...
            </option>
            {departamentos.map((departamento) => {
              return (
                <option key={departamento.codigo} value={departamento.codigo}>
                  {departamento.nome}
                </option>
              );
            })}
          </Form.Select>
          
          <Form.Control.Feedback type="invalid">
            Por favor, informe a categoria do produto.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Gravar</Button>
      <Button
        onClick={() => {
          props.setExibirTabela(true);
        }}
      >
        Voltar
      </Button>
    </Form>
  );
}
