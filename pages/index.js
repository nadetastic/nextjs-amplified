import Head from 'next/head'
import styles from '../styles/Home.module.css'
// import secrets from "../secrets.json"

import { Auth, API, withSSRContext } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react"
import '@aws-amplify/ui-react/styles.css';
import { useState } from 'react';

function Home(props) {

  const [userinfo, set_userinfo] = useState()
  const [amplifyuser, set_amplifyuser] = useState()

  const signUp = async () => {
    try {
      const res = await Auth.signUp(userinfo.username,userinfo.password);
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }

  const confirmSignUp = async() => {
    try {
      const res = await Auth.confirmSignUp(userinfo.username,userinfo.code);
      console.log(res);
    } catch (e){
      console.log(e)
    }
  }
  
  const signIn = async () => {
    try {
      const res = await Auth.signIn(userinfo.username,userinfo.password);
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

  const resendSignUp = async() => {
    try {
      const res = await Auth.resendSignUp(username);
      console.log(res);
    } catch(e) {
      console.log(e);
    }
  }

  const signOut = async () => {
    try {
      await Auth.signOut();
      console.log('Signed Out')
    } catch(e) {
      console.error(e)
    }
  }

  const get = async () => {
    const myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
      }
    };
    try {
      const res = await API.get('MyAPI', '/', myInit);
      console.log(res);
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

        <p>userinfo: {JSON.stringify(userinfo)}</p>
        <p>FROM gSSP: {props.data}</p>

        <div>
          <h3>Sign Up/ Sign In</h3>
          <input onChange={(e) => set_userinfo({...userinfo, username: e.target.value})} placeholder="username" /><br />
          <input onChange={(e) => set_userinfo({...userinfo, password: e.target.value})} placeholder="password" /><br />
          <button onClick={signUp}>Auth.signUp</button><br />
          <button onClick={signIn}>Auth.signIn</button>
        </div>

        <div>
          <h3>Confirm SignUp</h3>
          <input onChange={(e) => set_userinfo({...userinfo, code: e.target.value})} placeholder="code" /><br />
          <button onClick={confirmSignUp}>Auth.confirmSignUp</button>
        </div>
        
        <div>
          <h3>Sign Out</h3>
          <button onClick={signOut}>Auth.signOut</button>
        </div>

        <div>
          <button onClick={get}>API.get</button>
        </div>

        <div className={styles.grid}>
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
            <p><code>Auth.completeNewPassword</code></p>
          </div>

          <div onClick={resendSignUp}className={styles.card}>
            <h3>Resend Verification Code &rarr;</h3>
            <p><code>Auth.resendSignUp</code></p>
          </div>

  

       
        </div>
      </main>

      <footer className={styles.footer}><p>NextJS Amplified</p></footer>
    </div>
  )
}


const HomeUI = () => {
  return ( <Authenticator></Authenticator> );
}
 
// export default HomeUI;



export default Home;

export async function getServerSideProps(context) {

  const { Auth, API } = withSSRContext(context)

  try {
    // const user = await Auth.currentAuthenticatedUser()
    const myInit = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
      }
    };
    const data = await API.get('MyAPI', '/', myInit)
    console.log(data)
    return {
      props: {
        data: JSON.stringify(data)
      }
    }
  } catch (err) {
    console.log(err)
    return {
      props: {
        data: JSON.stringify(err)
      }
    }
  }
}