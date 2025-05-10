import React from "react";
import styles from "./agendamento.module.css";
import AgendamentoForm from "../../components/AgendamentoForm";
import Link from "next/link";

const AgendamentoPage = () => {
  return (
    <section className={styles.agendamento}>
      <Link href="/">
        <img src="./images/voltar.png" alt="Voltar" className={styles.iconeVoltar} />
      </Link>
      <AgendamentoForm />
    </section>
  );
};

export default AgendamentoPage;