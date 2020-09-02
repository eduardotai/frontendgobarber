import React, {useRef, useCallback} from 'react'
import { Container, Content, Background } from './styles'
import logoImg from '../../assets/logo.svg'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import Input from '../../components/input'
import {FormHandles} from '@unform/core'
import getValidationErrors from '../../utils/getValidationErros'
import {useAuth} from '../../hooks/AuthContext'
import {useToast} from '../../hooks/ToastContext'

import Button from '../../components/input/Button'

import {Form } from '@unform/web'
import * as Yup from 'yup'


interface SignInFormData {
    email: string
    password: string
}

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null)

    const { signIn } = useAuth()
    const { addToast } = useToast()

    const handleSubmit = useCallback(async (data: SignInFormData) => {
         try{
             formRef.current?.setErrors({})
 
 
             const schema = Yup.object().shape({
                 name: Yup.string().required('Nome obrigatório'),
                 email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                 password: Yup.string().required('Senha obrigatória')
             })
 
             await schema.validate(data, {
                 abortEarly: false,
             })
             
             await signIn({
                 email: data.email,
                 password: data.password,
             })
         }catch(err){
            
            if(err instanceof Yup.ValidationError) {
                const errros = getValidationErrors(err)
                formRef.current?.setErrors(errros)
            }
             
            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer login cheque as credencias'
            })
         }
     }, [signIn, addToast])

    return (
    <Container>
        <Content>
            <img src={logoImg} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu Logon</h1>

                <Input name="email" icon={FiMail} placeholder="E-mail" />
                <Input name ="password" icon={FiLock} type="password" placeholder="Senha" />

                <Button type="submit">Entrar</Button>
                <a href="forgot">Esqueci minha senha</a>
            </Form>

            <a href="">
            <FiLogIn />
            Criar Conta
            </a>
        </Content>
     <Background />

    </Container>
    )
    }

export default SignIn