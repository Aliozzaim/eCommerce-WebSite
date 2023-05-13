import React from 'react'
import styles from "../Navbar/styles.module.css"
function SuccessLogin() {
  return (
    <div className={styles.successEntry}>
        <h1>Congrats! You have logged Successfully!</h1>
        <h2>We are very happy to see you again  :) Good Shopping :)</h2>
        <br /><br />
        <h4>You have been  redirected to Home Page...</h4>
    </div>
  )
}

export default SuccessLogin