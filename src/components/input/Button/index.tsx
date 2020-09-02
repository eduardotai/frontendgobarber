import React, {ButtonHTMLAttributes} from 'react'
import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}



const Input: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({children, ...rest}) => (
    <Container {...rest}> 
    {children}
    </Container>
)

export default Input