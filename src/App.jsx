import {
   useState,
   useRef
   } from 'react'
import './App.css'
import { Header } from './Header';

/**
 * Aqui foi decidido utilizar a abordagem de estados 
 * "Uncontrolled", que é quando não ficamos "observando"
 *  um estado a todo momento, apenas acessamos ele quando 
 *  for preciso, como em um evento de submit por exemplo....
 * 
 * A abordagem que estava sendo utilizada antes pode ser chamada de 
 * "Controlled", onde utilizamos um evento como o "onChange" para 
 * verificar e alterar um estado a qualquer alteração que ele tenha
 */
function App() {
  /**
   * Utilizando o useRef não será mais necessário utilizar useStates
   */
  // const [name, setName] = useState("")
  // const [email, setEmail] = useState("")
  // const [username, setUsername] = useState("")
  // const [description, setDescription] = useState("")
  // const [type, setType] = useState("user")

  /**
   * ======================================
   */
  /**
   * Alterando os eventos onChange dos inputs para utilizar o hook useRef
   * Que irá fazer com que tenhamos uma referência direta do componente
   * Por estar com referência direta a um componente, esta referência 
   * carrega os dados do componente podendo assim substituir o "onChange"
   */
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const descriptionRef = useRef(null);
  // const typeRef = useRef(null);

  function handleSave(e){
    e.preventDefault();
   /* Acessando o valor da referência, current é
    * para pegar o estado atual do componente,
    * value seria o valor. ("?" é para somente
    * pegar quando tiver valor) 
    */
    console.log({
      name: nameRef.current?.value, 
      email: emailRef.current?.value,
      username: usernameRef.current?.value,
      description: descriptionRef.current?.value,
      // type: typeRef.current?.value,
    })
  }


  return (
    <div className="container">
      <h1>React</h1>
      <Header/>

      <form className="form" onSubmit={handleSave}>
        <input
          type="text"
          // value={name}
          // onChange={ (event) => setName(event.target.value) }
          ref={nameRef} //Atrelando uma referência ao input
          placeholder="Digite seu nome..."
          className="input"
        />

        <input
          type="text"
          // value={email}
          // onChange={ (event) => setEmail(event.target.value) }
          ref={emailRef}
          placeholder="Digite seu email..."
          className="input"
        />

        <input
          type="text"
          // value={username}
          // onChange={ (event) => setUsername(event.target.value) }
          ref={usernameRef}
          placeholder="Digite seu username..."
          className="input"
        />

        <textarea
          type="text"
          // value={description}
          // onChange={ (event) => setDescription(event.target.value) }
          ref={descriptionRef}
          placeholder="Digite sua descriçao..."
          className="input"
        ></textarea>


        {/* <select  
          className="select"
          // value={type}
          // onChange={e => setType(e.target.value)}
          ref={typeRef}
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select> */}


        <button className="button" type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default App
