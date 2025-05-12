"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/AgendamentoForm.module.css";

const AgendamentoForm = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [hora, setHora] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [nomeFocus, setNomeFocus] = useState(false);
  const [telefoneFocus, setTelefoneFocus] = useState(false);
  const [horaFocus, setHoraFocus] = useState(false);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

  // Definindo a data fixa diretamente no estado
  const [dataFixa] = useState("2025-05-21"); // Use a data fixa desejada

  useEffect(() => {
    const gerarHorarios = () => {
      const horarios = [];
      const inicio = 10 * 60 + 30; // 10:30 em minutos
      const fim = 18 * 60; // 18:00 em minutos
      for (let i = inicio; i <= fim; i += 15) {
        const hora = Math.floor(i / 60);
        const minuto = i % 60;
        horarios.push(
          `${String(hora).padStart(2, "0")}:${String(minuto).padStart(2, "0")}`
        );
      }
      setHorariosDisponiveis(horarios);
    };
    gerarHorarios();
  }, []);

  const formatarTelefone = (value) => {
    const cleanedValue = value.replace(/\D/g, "").slice(0, 11);
    if (cleanedValue.length < 2) {
      return cleanedValue;
    }
    const ddd = cleanedValue.slice(0, 2);
    const primeiroDigito = cleanedValue.slice(2, 3);
    const parte1 = cleanedValue.slice(3, 7);
    const parte2 = cleanedValue.slice(7, 11);
    if (cleanedValue.length >= 11) {
      return `(${ddd}) ${primeiroDigito}${parte1}-${parte2}`;
    } else if (cleanedValue.length >= 7) {
      return `(${ddd}) ${primeiroDigito}${parte1}-${parte2}`;
    } else if (cleanedValue.length > 2) {
      return `(${ddd}) ${cleanedValue.slice(2)}`;
    } else if (cleanedValue.length > 0) {
      return `(${cleanedValue}`;
    }
    return "";
  };

  const handleTelefoneChange = (event) => {
    setTelefone(formatarTelefone(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMensagem("");
    setErro("");
    if (!nome || !telefone || !hora) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }
    try {
      const response = await fetch(
        "https://agendamentoonback.onrender.com/api/agendamento",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, telefone, data: dataFixa, hora }),
        }
      );
      if (response.ok) {
        setMensagem("Agendamento realizado com sucesso!");
        setNome("");
        setTelefone("");
        setHora("");
        setNomeFocus(false);
        setTelefoneFocus(false);
        setHoraFocus(false);
      } else {
        const errorData = await response.json();
        setErro(`Erro ao agendar: ${errorData.message || "Erro desconhecido"}`);
      }
    } catch (error) {
      setErro("Erro ao conectar com o servidor.");
      console.error("Erro:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headLine}>
        <p className={styles.txt}>Garanta uma consulta com um Optometrista!</p>
        <p className={styles.txtVagas}>Vagas limitadas!</p>
      </div>
      {mensagem && <p className={styles.success}>{mensagem}</p>}
      {erro && <p className={styles.error}>{erro}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <div
            className={styles.placeholdersContainer}
            onClick={() => document.getElementById("nome").focus()}
          >
            <img
              src="./images/nome.png"
              alt="Nome"
              className={styles.iconeInput}
              style={{ opacity: nomeFocus || nome ? 0 : 1 }}
            />
            <span
              className={styles.spanInput}
              style={{ opacity: nomeFocus || nome ? 0 : 1 }}
            >
              Nome Completo
            </span>
          </div>
          <input
            className={styles.input}
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onFocus={() => setNomeFocus(true)}
            onBlur={() => !nome && setNomeFocus(false)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <div
            className={styles.placeholdersContainer}
            onClick={() => document.getElementById("telefone").focus()}
          >
            <img
              src="./images/whatsapp.png"
              alt="WhatsApp"
              className={styles.iconeInput}
              style={{ opacity: telefoneFocus || telefone ? 0 : 1 }}
            />
            <span
              className={styles.spanInput}
              style={{ opacity: telefoneFocus || telefone ? 0 : 1 }}
            >
              WhatsApp
            </span>
          </div>
          <input
            className={styles.input}
            type="tel"
            id="telefone"
            value={telefone}
            onChange={handleTelefoneChange}
            onFocus={() => setTelefoneFocus(true)}
            onBlur={() => !telefone && setTelefoneFocus(false)}
            required
          />
        </div>
        <p className={styles.txtHorario}>
          Horários disponíveis para o dia{" "}
          <span className={styles.spanDate}>
            {dataFixa.split("-").reverse().join("/")}
          </span>
        </p>
        <div className={styles.formGroup}>
          <div
            className={styles.placeholdersContainer}
            onClick={() => document.getElementById("hora").focus()}
          >
            <img
              src="./images/relogio.png"
              alt="Relógio"
              className={styles.iconeInput}
              style={{ opacity: horaFocus || hora ? 0 : 1 }}
            />
            <span
              className={styles.spanInput}
              style={{ opacity: horaFocus || hora ? 0 : 1 }}
            >
              --:--
            </span>
          </div>
          <select
            className={styles.input}
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            onFocus={() => setHoraFocus(true)}
            onBlur={() => !hora && setHoraFocus(false)}
            required
          >
            <option value="" disabled>
              Selecione o horário
            </option>
            {horariosDisponiveis.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.button}>
          Agendar
        </button>
      </form>
    </div>
  );
};

export default AgendamentoForm;
