"use client";
import { useState } from 'react';
import styles from './finances.module.css';

import { FaPen, FaTrash } from 'react-icons/fa';
import ListaTransacao from '@/models/ListaTransacao';

const listaTransacao = new ListaTransacao();

function Finances() {
  // Inputs
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')

  //Dados da classe
  const[lista, setLista] = useState(listaTransacao.getHistorico());
  const[saldo, setSaldo] = useState(listaTransacao.saldo);
  const[recitas, setReceitas] = useState(listaTransacao.receitas);
  const[despesas, setDespesas] = useState(listaTransacao.despesas);
  

    // Edição
    const [flag, setFlag] = useState(0)
    const [editButton, setEditButton] = useState(false)

    //Adicionar Receita
    const addReceita = () => {
        // console.log('addR');
        listaTransacao.adicionarTransacao(description, value, "Receita");
        atualizarValores();
    }

    //Adicionar Despesa
    const addDespesa = () => {
        // console.log('addD');
        listaTransacao.adicionarTransacao(description, value, "Despesa");
        atualizarValores();
    }

    const  exclude = (id) => {
        listaTransacao.excluirTransacao(id);
        atualizarValores();
    }

    const edit = (id) => {
        const transacao = listaTransacao.getTransacaoPorId(id);
        setDescription(transacao.descricao);
        setValue(transacao.valor);

        setEditButton(true);
        setFlag(id);
    }

    const update = () => {
        listaTransacao.atualizarTransacao(flag, description, value);
        atualizarValores();
        setEditButton(false);
        setFlag(0);
    }

    const atualizarValores =() => {
        setDescription('');
        setValue('');

        setSaldo(listaTransacao.saldo);
        setReceitas(listaTransacao.receitas);
        setDespesas(listaTransacao.despesas);
        setLista(listaTransacao.getHistorico());
    }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.profile}>
          <p className={styles.welcome}>Olá, Camis</p>
          <p className={styles.useremail}>camila.bersan@aluno.senai.br</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.mainheader}>
          <p className={styles.title}>Dashboard</p>
          <div className={styles.transaction}>
            <div className={styles.description}>
              <input
                className={styles.inputdescription}
                value={description}
                type="text"
                name='description'
                placeholder='Descrição'
                onChange={(e) => setDescription(e.target.value)}
              />
              <input className={styles.inputdescription} value={value} type="number" name='description' placeholder='Valor (R$)' onChange={(e) => setValue(e.target.value)}/>
            </div>
            <div className={styles.type}>
              {
                editButton ? (
                  <button className={styles.buttonAtualizar} onClick={update} >Atualizar</button>
                ) : (
                  <>
                    <button className={styles.buttonreceita} onClick={addReceita} >Receita</button>
                    <button className={styles.buttondespesa} onClick={addDespesa} >Despesa</button>
                  </>
                )
              }
            </div>
          </div>
        </div>
        <div className={styles.infos}>
          <div className={styles.cardSaldo}>
            <p className={styles.cardTitle}>Saldo</p>
            <p className={styles.cardValue}>R$ {saldo}</p>
          </div>
          <div className={styles.cardReceitas}>
            <p className={styles.cardTitle}>Receitas</p>
            <p className={styles.cardValue}>R$ {recitas}</p>
          </div>
          <div className={styles.cardDespesas}>
            <p className={styles.cardTitle}>Despesas</p>
            <p className={styles.cardValue}>R$ {despesas}</p>
          </div>
        </div>

        <div className={styles.registros}>
          <div className={styles.registrosreceitas}>
            <p className={styles.registrosreceitastitle}>Receitas Registradas</p>
            <div className={styles.registrosreceitaslist}>
            {
                lista.map(transacao => 
                    transacao.tipo == "Receita" && (
                        <div key={transacao.id} className={styles.registrosreceitasitem}>
                            <p>{transacao.descricao}</p>
                            <p className={styles.registrosreceitasvalue}>R$:{transacao.valor}</p>

                            <div className={styles.actions}>
                                <button className={styles.actionsbutton} onClick={ () => exclude(transacao.id)}> 
                                <FaTrash /></button>
                                <button className={styles.actionsbutton} onClick={ () => edit(transacao.id)}> 
                            <FaPen /></button>
                            </div>
                        </div>
                    )
                )
              }

            </div>
          </div>

          <div className={styles.registrosdespesas}>
            <p className={styles.registrosdespesastitle}>Despesas Registradas</p>

            <div className={styles.registrosdespesaslist}>
              {
                lista.map(transacao => 
                    transacao.tipo == "Despesa" && (
                        <div key={transacao.id} className={styles.registrosdespesasitem}>
                            <p>{transacao.descricao}</p>
                            <p className={styles.registrosdespesasvalue}>R$: {transacao.valor}</p>

                            
                            <div className={styles.actions}>
                                <button className={styles.actionsbutton} onClick={ () => exclude(transacao.id)}> 
                                <FaTrash /></button>
                                <button className={styles.actionsbutton} onClick={ () => edit(transacao.id)}> 
                            <FaPen /></button>
                            
                            </div>
                        </div>
                    )
                )
              }
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Finances