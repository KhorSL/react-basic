import React, { useState, useRef } from "react"
import Button from "../../UI/Button/Button"
import Card from "../../UI/Card/Card"
import ErrorModal from "../../UI/ErrorModal/ErrorModal"
import styles from "./AddUser.module.css"

const AddUser = (props) => {
  const [inputUsername, setInputUsername] = useState("")
  const [inputAge, setInputAge] = useState("")
  const [isShowError, setIsShowError] = useState(false)
  const [error, setError] = useState({})

  const usernameInput = useRef(null)

  const resetInputs = () => {
    setInputUsername("")
    setInputAge("")
  }

  const closeErrorModalHandler = () => {
    setIsShowError(false)
  }

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

  const addUserHandler = (event) => {
    event.preventDefault()
    const errorCode = validateInputs()
    if (errorCode !== 0) {
      mapAndSetError(errorCode)
      setIsShowError(true)
      return
    }
    props.addUser({ username: inputUsername, age: inputAge })
    resetInputs()
    usernameInput.current.focus()
  }

  const usernameChangeHandler = (event) => {
    setInputUsername(event.target.value)
  }

  const ageChangeHandler = (event) => {
    setInputAge(event.target.value)
  }

  return (
    <div>
      {isShowError && (
        <ErrorModal
          title={error.title}
          message={error.message}
          closeErrorModal={closeErrorModalHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={usernameInput}
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
          <Button type="submit">Add user</Button>
        </form>
      </Card>
    </div>
  )
}

export default AddUser
