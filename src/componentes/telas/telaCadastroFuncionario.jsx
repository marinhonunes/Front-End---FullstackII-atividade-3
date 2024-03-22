import FormCadFuncionarios from "../formularios/formCadFuncionarios";
import TabelaFuncionarios from "../tabelas/tabelaFuncionarios";
import Pagina from "../templates/pagina";
import { useState, useEffect } from "react";

export default function TelaCadastroFuncionario(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaFuncionarios, setListaFuncionarios] = useState([]);
    const [funcionarioAEditar, setFuncionarioAEditar] = useState(null);

    const buscarFuncionarios = () => {
        fetch('http://localhost:3001/funcionario', { method: 'GET' })
            .then(response => response.json())
            .then(({ status, listaFuncionarios }) => {
                if (status) {
                    setListaFuncionarios(listaFuncionarios);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar funcionarios:', error);
            });
    };

    useEffect(()=>{
        buscarFuncionarios();
    },[listaFuncionarios]);

    const editarFuncionario = (funcionario) => {
        setFuncionarioAEditar(funcionario);
        setExibirTabela(false); 
    };

    if (exibirTabela) {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Funcionários</h1>
                    <br/>
                    <h2>Lista de funcionários</h2>
                    <TabelaFuncionarios
                        listaFuncionarios={listaFuncionarios}
                        setExibirTabela={setExibirTabela}
                        editarFuncionario={editarFuncionario} 
                        setFuncionarioAEditar={setFuncionarioAEditar}
                    />
                </Pagina>
            </div>
        );
    }
    else {
        return (
            <div>
                <Pagina>
                    <h1>Tela de Cadastro de Funcionários</h1>
                    <br/>
                    <h2>Formulário de edição de Funcionários</h2>
                    <FormCadFuncionarios
                        setExibirTabela={setExibirTabela}
                        listaFuncionarios={listaFuncionarios}
                        setListaFuncionarios={setListaFuncionarios}
                        funcionarioAEditar={funcionarioAEditar} 
                     />
                </Pagina>
            </div>
        );
    }
}
