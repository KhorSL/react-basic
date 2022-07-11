import React from "react"
import styles from "./UserList.module.css"
import User from "../User/User"
import Card from "../../UI/Card/Card"

const UserList = (props) => {
  return (
    <Card className={styles.users}>
      <ul>
        {props.users.map((user) => {
          return (
            <User
              user={user}
              key={user.id}
              deleteUser={props.deleteUser}
              openUpdateModal={props.openUpdateModal}
            />
          )
        })}
      </ul>
    </Card>
  )
}

export default UserList
