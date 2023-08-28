//import {
   //useState,
   //useRef
   //} from 'react'
import './App.css'
import { Header } from './Header';

import { useForm } from 'react-hook-form';

/**
 * Trabalhando com schema validation
 */

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * Criando o objeto para validação
 */
const schema = z.object({
  /**
   * O zod fornece varias opções e tipos de validações
   * para os componentes de um formulários, a seguir
   * alguns exemplos
   */
  name: z.string().nonempty("O campo nome é obrigatório"),
  email: z.string().email("Digite seu email").nonempty("O campo email é obrigatório"),
  username: z.string()
             .min(3, "O username deve ter pelo menos 3 caracteres")
             .max(10, "O username deve ter menos 10 caracteres")
             .nonempty("O campos username é obrigatório"),
  telefone: z.string()
             .refine((value) => /^{2} ?\d{9}$/.test(value), {//Aplicando um pattern através de regex
              //Criando uma mensagem para quando não passar na validação do schema
              message: "Digite um telefone no formato DD + 9 números"
             }) 
             .nonempty("Telefone é um campo obrigatório")
});

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
/**
 * Bibliotecas interessantes para criação de formulários:
 * 
 * - React Hook Form
 * - Formik
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
  //(Removido para utilizar a lib React-Hook-Form)
  // const nameRef = useRef(null);
  // const emailRef = useRef(null);
  // const usernameRef = useRef(null);
  // const descriptionRef = useRef(null);
  // const typeRef = useRef(null);

  // function handleSave(e){
  //   e.preventDefault();
   /* Acessando o valor da referência, current é
    * para pegar o estado atual do componente,
    * value seria o valor. ("?" é para somente
    * pegar quando tiver valor) 
    */
    // console.log({
    //   name: nameRef.current?.value, 
    //   email: emailRef.current?.value,
    //   username: usernameRef.current?.value,
    //   // description: descriptionRef.current?.value,
    //   // type: typeRef.current?.value,
    // })
  // }

  /**
   * Utilizando a lib react-hook-form
   * para trabalhar com formulários em react
   */

  /**
   * useForm retorna 2 valores, "register" 
   * que seria a função para registrar o
   * componente que vamos "monitorar" os dados 
   * 
   * o useForm também pode receber por parâmetro um "resolver"
   * que ao fazer submit irá validar os dados com o schema que
   * criamos anteriormente
   * 
   * A mensagem de erro retornada pelo schema criado,
   * pode ser acessada através da propriedade formState 
   * do useForm, nela conseguimos acessar alguns dados 
   * das inputs, como os erros citados anteriormente
   */
  const{register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  /**
   * Qaundo passamos um método para o handleSubmit do hook-form
   * ele nos passa um parâmetro "data" que seria os itens do nosso formulário
   */
  function handleSave(data) {
    console.log(data);
  }

  return (
    <div className="container">
      <h1>React</h1>
      <Header/>

      {/**
        * onSubmit={handleSave} --Removido
        * Com a lib do react-hook-form, não mais passamos
        * a nossa função de submit diretamente para o formulário,
        * e sim a função que o hook nos fornece
        */}
      <form className="form" onSubmit={handleSubmit(handleSave)}>
        <input
          type="text"
          // value={name}
          // onChange={ (event) => setName(event.target.value) }
          // ref={nameRef} //Atrelando uma referência ao input (Removido para utilizar a lib React-Hook-Form)
          placeholder="Digite seu nome..."
          className="input"
           /**
           * - Para utilizar o register, basta apenas dar um nome para o componente
           * - Register também recebe "options" como parâmetro, e com eles conseguimos,
           *   por exemplo, fazer validações nos campos que queremos que sejam obrigatórios
           **/
          {...register("name"/*, {required:true}*/)}
          id="name"
        />
        {/**Renderizando uma mensagem de erro para quando um campo estiver fora do schema */}
        {errors.name && (<p className='error'>{errors.name.message}</p>)} 

        <input
          type="text"
          // value={email}
          // onChange={ (event) => setEmail(event.target.value) }
          //ref={emailRef} (Removido para utilizar a lib React-Hook-Form)
          placeholder="Digite seu email..."
          className="input"
          {...register("email"/*, {required:true}*/)} 
          id="email"
        />
        {/**Renderizando uma mensagem de erro para quando um campo estiver fora do schema */}
        {errors.email && (<p className='error'>{errors.email.message}</p>)} 

        <input
          type="text"
          // value={username}
          // onChange={ (event) => setUsername(event.target.value) }
          //ref={usernameRef} (Removido para utilizar a lib React-Hook-Form)
          placeholder="Digite seu username..."
          className="input"
          {...register("username"/*, {required:true}*/)} //Para utilizar o register, basta apenas dar um nome para o componente
          id="username"
        />
        {/**Renderizando uma mensagem de erro para quando um campo estiver fora do schema */}
        {errors.username && (<p className='error'>{errors.username.message}</p>)} 

        {/* <textarea
          type="text"
          // value={description}
          // onChange={ (event) => setDescription(event.target.value) }
           ref={descriptionRef}
           placeholder="Digite sua descriçao..."
           className="input"
         ></textarea> */}


        {/* <select  
          className="select"
          // value={type}
          // onChange={e => setType(e.target.value)}
          ref={typeRef}
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select> */}

        <input
          type="text"
          // value={username}
          // onChange={ (event) => setUsername(event.target.value) }
          //ref={usernameRef} (Removido para utilizar a lib React-Hook-Form)
          placeholder="Digite seu telefone..."
          className="input"
          {...register("telefone"/*, {required:true}*/)} //Para utilizar o register, basta apenas dar um nome para o componente
          id="username"
        />
        {/**Renderizando uma mensagem de erro para quando um campo estiver fora do schema */}
        {errors.telefone && (<p className='error'>{errors.telefone.message}</p>)} 

        <button className="button" type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default App
