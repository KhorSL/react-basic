import React, { useState } from "react"
import ReactDOM from "react-dom"
import Button from "../Button/Button"
import Card from "../Card/Card"
import Backdrop from "../Backdrop/Backdrop"
import styles from "./UpdateModal.module.css"

const UpdateModal = (props) => {
  const [inputUsername, setInputUsername] = useState(props.user.username)
  const [inputAge, setInputAge] = useState(props.user.age)
  const [error, setError] = useState({})
  const [isShowError, setIsShowError] = useState(false)

  const validateInputs = () => {
    if (inputUsername.trim().length === 0 || inputAge.trim().length === 0) {
      return 1
    }
    if (+inputAge.trim() < 1) {
      return 2
    }
    return 0
  }

  const mapAndSetError = (errorCode) => {
    let error = {}
    switch (errorCode) {
      case 1:
        error.title = "Invalid input!"
        error.message = "Please enter a valid name and age (non-empty values)."
        break
      case 2:
        error.title = "Invalid age!"
        error.message = "Please enter a valid age (> 0 year old)."
        break
      default:
        error.title = "An error occurred!"
        error.message = "Something went wrong."
    }
    setError(error)
  }

  const updateUserHandler = (event) => {
    event.preventDefault()
    const errorCode = validateInputs()
    if (errorCode !== 0) {
      mapAndSetError(errorCode)
      setIsShowError(true)
      return
    }
    props.updateUser(props.user.id, { username: inputUsername, age: inputAge })
  }

  const usernameChangeHandler = (event) => {
    setInputUsername(event.target.value)
    setIsShowError(false)
  }

  const ageChangeHandler = (event) => {
    setInputAge(event.target.value)
    setIsShowError(false)
  }

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeUpdateModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Card className={styles.modal}>
          <header className={styles.header}>
            <h2>{props.title}</h2>
          </header>
          <div className={styles.content}>
            <form className={styles.input} onSubmit={updateUserHandler}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                onChange={usernameChangeHandler}
                value={inputUsername}
              />
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                onChange={ageChangeHandler}
                value={inputAge}
              />
              <button style={{ display: "none" }} type="submit" />
            </form>
            {isShowError && (
              <p className={styles.errorMessage}>{error.message}</p>
            )}
          </div>
          <footer className={styles.actions}>
            <Button type="button" onClick={updateUserHandler}>
              {props.buttonText || "Update"}
            </Button>
          </footer>
        </Card>,
        document.getElementById("overlay-root")
      )}
    </>
  )
}

export default UpdateModal
