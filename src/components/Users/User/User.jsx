import React from "react"
import styles from "./User.module.css"

const User = (props) => {
  const displayUpdateModalHandler = () => {
    props.openUpdateModal(props.user)
  }

  const deleteHandler = () => {
    props.deleteUser(props.user.id)
  }

  return (
    <li>
      <span
        className={styles.userDetail}
        onClick={displayUpdateModalHandler}
      >{`${props.user.username} (${props.user.age} years old)`}</span>
      <button className={styles.button} onClick={deleteHandler}>
        X
      </button>
    </li>
  )
}

export default User
