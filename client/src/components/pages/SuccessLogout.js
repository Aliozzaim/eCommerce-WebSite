import React from 'react'
import styles from "../Navbar/styles.module.css"
function SuccessLogout() {
  return (
    <div className={styles.successEntry}>
        <h1>You are logging out of your account,</h1>
        <h2>If you want to buy something you must login</h2>
        <br /><br />
        <h4>You have been  redirected to Home Page...</h4>
    </div>
  )
}

export default SuccessLogout