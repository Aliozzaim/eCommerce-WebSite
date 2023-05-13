import React from 'react'
import styles from "../Navbar/styles.module.css"
function SuccessRegister() {
  return (
    <div className={styles.successEntry}>
        <h1>Congrats! You have registered Successfully!</h1>
        <h2>Good Shopping :)</h2>
        <br /><br />
        <h4>You have been  redirected to Home Page...</h4>
    </div>
  )
}

export default SuccessRegister