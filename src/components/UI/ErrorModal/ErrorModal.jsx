import React from "react"
import ReactDOM from "react-dom"
import Backdrop from "../Backdrop/Backdrop"
import Button from "../Button/Button"
import Card from "../Card/Card"
import styles from "./ErrorModal.module.css"

const ErrorModal = (props) => {
  const ModalOverlay = (props) => {
    return (
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
    )
  }

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeErrorModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          buttonText={props.buttonText}
          closeErrorModal={props.closeErrorModal}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  )
}

export default ErrorModal
