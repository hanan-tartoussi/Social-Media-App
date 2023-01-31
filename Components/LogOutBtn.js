import React, { useContext } from 'react'
import ButtonForm from '../Components/ButtonForm';
import {AuthContext} from '../Navigation/AuthProvider';

export default function LogOutBtn() {
    const {user, logout} = useContext(AuthContext);
  return (
    <ButtonForm buttonTitle="Logout" onPress={() => logout()} />
  )
}
