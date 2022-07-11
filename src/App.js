import React, { useState } from "react"
import UpdateModal from "./components/UI/UpdateModal/UpdateModal"
import AddUser from "./components/Users/AddUser/AddUser"
import UserList from "./components/Users/UserList/UserList"

function App() {
  const [users, setUsers] = useState([])
  const [isShowUpdate, setIsShowUpdate] = useState(false)
  const [userToUpdate, setUserToUpdate] = useState({})

  const addUserHandler = (user) => {
    setUsers((prev) => {
      const updatedUser = [...prev]
      updatedUser.unshift({
        id: Math.random().toString(),
        username: user.username,
        age: user.age,
      })
      return updatedUser
    })
  }

  const deleteUserHandler = (userId) => {
    setUsers((prev) => {
      return prev.filter((user) => {
        return user.id !== userId
      })
    })
  }

  const updatedUserHandler = (userId, updatedUserDetail) => {
    setUsers((prev) => {
      const updatedUsers = [...prev]
      const userIndex = updatedUsers.findIndex((object) => {
        return object.id === userId
      })

      updatedUsers[userIndex].username = updatedUserDetail.username
      updatedUsers[userIndex].age = updatedUserDetail.age

      return updatedUsers
    })
    closeUpdateModalHandler()
  }

  const closeUpdateModalHandler = () => {
    setIsShowUpdate(false)
  }

  const openUpdateModalHandler = (user) => {
    setUserToUpdate(user)
    setIsShowUpdate(true)
  }

  return (
    <div>
      {isShowUpdate && (
        <UpdateModal
          title={`Update ${userToUpdate.username}'s detail`}
          user={userToUpdate}
          closeUpdateModal={closeUpdateModalHandler}
          updateUser={updatedUserHandler}
        />
      )}
      <AddUser addUser={addUserHandler} />
      {users.length > 0 && (
        <UserList
          users={users}
          deleteUser={deleteUserHandler}
          closeUpdateModal={closeUpdateModalHandler}
          openUpdateModal={openUpdateModalHandler}
        />
      )}
    </div>
  )
}

export default App
