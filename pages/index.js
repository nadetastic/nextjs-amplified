import Head from 'next/head'
import styles from '../styles/Home.module.css'
import secrets from "../secrets.json"

import { Auth } from "aws-amplify";

export default function Home() {

  const username = secrets.username // || "";
  const pass = secrets.password // || "";
  const oldPass = secrets.password // || ""
  const code = "";

  const signIn = async () => {
    try {
      const res = await Auth.signIn(username,pass);
      console.log(res)
    } catch(e) {
      console.log(e)
    }
  }

  const changeP = async () => {
    try {
      const user = await Auth.signIn(username,pass);
      console.log(user)
      const res = await Auth.changePassword(user,oldPass,pass);
      console.log(res)
    } catch(e) {
      console.log(e)
    }
  }

  const completeNewPassword = async () => {
    try {
      const user = await Auth.signIn(username,pass);
      const res = await Auth.completeNewPassword(user,pass);
      console.log(res);
    } catch(e) {
      console.log(e)
    }
  }

  const forgotP = async () => {
    try {
      const res = await Auth.forgotPassword(username);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  const forgotPS = async () => {
    try {
      const res = await Auth.forgotPasswordSubmit(username, code, pass);
      console.log(res);
    } catch(e) {
      console.log(e)
    }
  } // Collect confirmation code and new password , then

  const forceChange = async () => {
    try {
      const res = await Auth.completeNewPassword(username,pass);
      console.log(res);
    } catch(e) {
      console.log(e);
    }
  }

  const signOut = async () => {
    try {
      const res = await Auth.signOut();
      console.log('Signed Out')
    } catch(e) {
      console.log(e)
    }
  }


  return (
    <div className={styles.container}>
      <Head><title>NextJS Amplifed</title></Head>

      <main className={styles.main}>
        <h1 className={styles.title}>NextJS Amplified</h1>

        <p className={styles.description}>Auth<br />
          <a rel="noopenner noreferrer" href="https://aws-amplify.github.io/amplify-js/api/classes/authclass.html" target="_blank"className={styles.small}>
            https://aws-amplify.github.io/amplify-js/api/classes/authclass.html
          </a>
        </p>

        <div className={styles.grid}>
          <div onClick={signIn} className={styles.card}>
            <h3>Sign In &rarr;</h3>
            <p><code>Auth.signIn</code></p>
          </div>
          <div onClick={changeP} className={styles.card}>
            <h3>Change Password</h3>
            <p><code>Auth.changePassword</code></p>
          </div>

          <div onClick={completeNewPassword} className={styles.card}>
            <h3>Complete New Password</h3>
            <p><code>Auth.completeNewPassword</code></p>
          </div>
          <div onClick={forgotP} className={styles.card}>
            <h3>Forgot Password &rarr;</h3>
            <p><code>Auth.forgotPassword</code></p>
          </div>

          <div onClick={forgotPS} className={styles.card}>
            <h3>Reset Password &rarr;</h3>
            <p><code>Auth.forgotPasswordSubmit</code></p>
          </div>

          <div onClick={forceChange}className={styles.card}>
            <h3>ForceChange Password &rarr;</h3>
            <p>
              <code>Auth.completeNewPassword</code>
            </p>
          </div>

          <div onClick={signOut}className={styles.card}>
            <h3>SignOut &rarr;</h3>
            <p><code>Auth.signOut</code></p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}><p>NextJS Amplified</p></footer>
    </div>
  )
}
