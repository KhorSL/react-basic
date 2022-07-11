import React from "react"
import Button from "../Button/Button"
import Card from "../Card/Card"
import styles from "./ErrorModal.module.css"

const ErrorModal = (props) => {
  return (
    <div id="ErrorModalContainer">
      <div className={styles.backdrop} onClick={props.closeErrorModal}></div>
      <Card className={styles.modal}>
        <header className={styles.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={styles.content}>
          <p>{props.message}</p>
        </div>
        <footer className={styles.actions}>
          <Button onClick={props.closeErrorModal}>
            {props.buttonText || "Back"}
          </Button>
        </footer>
      </Card>
    </div>
  )
}

export default ErrorModal