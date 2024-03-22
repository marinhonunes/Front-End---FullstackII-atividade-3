/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';

export default function TabelaFuncionarios(props) {
  const { listaFuncionarios, setExibirTabela, setListaFuncionarios } = props;
  const [erro, setErro] = useState(null);

  const deletarFuncionario = (codigo) => {
    const confirmacao = window.confirm('Tem certeza de que deseja excluir este funcionário?');
    fetch('http://localhost:3001/funcionario', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ codigo: codigo })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao deletar funcionário');
      }
      setListaFuncionarios(prevLista => prevLista.filter(func => func.codigo !== codigo));
    })
    .catch(error => {
      console.error('Erro ao deletar funcionário:', error);
      setErro('Erro ao deletar funcionário. Por favor, tente novamente mais tarde.');
    });
  };
  
  const editarFuncionario = (funcionario) => {
    props.setFuncionarioAEditar(funcionario); 
    setExibirTabela(false); 
  };

  return (
    <div>
      <Button onClick={() => setExibirTabela(false)}>Cadastrar Novo Funcionário</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Salário</th>
            <th>Data de Contratação</th>
            <th>Departamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaFuncionarios?.map((funcionario) => (
            <tr key={funcionario.codigo}>
              <td>{funcionario.codigo}</td>
              <td>{funcionario.nome}</td>
              <td>{funcionario.cargo}</td>
              <td>{funcionario.salario}</td>
              <td>{new Date(funcionario.dataContratacao).toLocaleDateString()}</td>
              <td>{funcionario.departamento.nome}</td>
              <td>
                <Button variant="primary" onClick={() => editarFuncionario(funcionario)}>
                  Editar
                </Button>{' '}
                <Button variant="danger" onClick={() => deletarFuncionario(funcionario.codigo)}>
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

