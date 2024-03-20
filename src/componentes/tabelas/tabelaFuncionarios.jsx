import { Button, Table } from "react-bootstrap";
export default function TabelaFuncionarios(props) {
    return (
        <div>
            <Button onClick={() => {
                props.setExibirTabela(false);
            }}>
                Cadastrar Novo Funcionário
            </Button>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Cargo</th>
                        <th>Salário</th>
                        <th>Data de Contratação</th>
                        <th>Departamento</th>
                        {/* <th>Categoria</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaFuncionarios?.map((funcionario, index) => {
                            return (
                                <tr key={funcionario.codigo}>
                                    <td>{funcionario.codigo}</td>
                                    <td>{funcionario.nome}</td>
                                    <td>{funcionario.cargo}</td>
                                    <td>{funcionario.salario}</td>
                                    <td>{new Date(funcionario.dataContratacao).toLocaleDateString()}</td>
                                    <td>{funcionario.departamento.nome}</td>
                                    {/* <td>{produto.categoria.descricao}</td> */}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            
        </div>
    )
}