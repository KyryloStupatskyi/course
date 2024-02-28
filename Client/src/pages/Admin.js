import React from "react"
import AdminAbilitiesList from "../components/AdminAbilitiesList"
import { Context } from "../index"
import { observer } from "mobx-react-lite"
import AddCinema from "../components/AdminPageComponents/AddCinema"
import AddHall from "../components/AdminPageComponents/AddHall"
import AddGenre from "../components/AdminPageComponents/AddGenre"
import AddMovie from "../components/AdminPageComponents/AddMovie"
import RegisterUser from "../components/AdminPageComponents/RegisterUser"
import HallReservations from "../components/AdminPageComponents/HallReservations"

const Admin = observer(() => {
  const { admin } = React.useContext(Context)

  React.useEffect(() => {

  }, [admin.selectAdminAbility])

  const adminComponents = {
    'Add Cinema': <AddCinema />,
    "Add cinema's hall": <AddHall />,
    "Add genre": <AddGenre />,
    "Add movie": <AddMovie />,
    "Register new User": <RegisterUser />,
    "Hall Reservation": <HallReservations />,
  };

  return (
    <div className="admin-page--container">
      <AdminAbilitiesList />
      <div className="addInfo">
        {adminComponents[admin.selectedAdminAbility.title]}
      </div>
    </div>
  )
})
export default Admin