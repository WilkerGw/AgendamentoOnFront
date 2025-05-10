import React from "react";
import styles from "../styles/Hero.module.css";
import Link from "next/link";

const Hero = () => {
  const dataFixa = "2025-05-21"; // Mesma data fixa do AgendamentoForm
  return (
    <section className={styles.hero}>
      <img src="./images/logo.png" alt="Logo" className={styles.logo} />
      <h1 className={styles.title}>
        Exame de Vista <br /><span className={styles.span}>Gratuito</span>
      </h1>
      <Link href="/agendamento"><button className={styles.button}>Agendar</button></Link>
      <p className={styles.txtHorarios}>Horários disponíveis para o dia <span className={styles.spanDate}>{dataFixa.split('-').reverse().join('/')}</span></p>
      <div className={styles.redesContainer}>
        <p>Nos siga nas redes sociais:</p>
        <div className={styles.contatos}>
          <div className={styles.contato}>
            <Link href={"https://www.instagram.com/oticasvizz/ "} target="_blank"><img src="./images/insta.png" alt="Instagram" className={styles.redeImg} /></Link>
          </div>
          <div className={styles.contato}>
            <Link href={"https://www.facebook.com/profile.php?id=61565492837095 "} target="_blank"><img src="./images/face.png" alt="Facebook" className={styles.redeImg} /></Link>
          </div>
          <div className={styles.contato}>
            <Link href={"https://wa.me/551123628799 "} target="_blank"><img src="./images/whats.png" alt="WhatsApp" className={styles.redeImg} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;