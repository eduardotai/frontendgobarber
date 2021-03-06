import styled from 'styled-components'
import signInBackgroundImg from '../../../assets/sign-up.png'
import { shade } from 'polished'

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`
export const Content = styled.div`
    display: flex;
    flex-direction: column;
    place-content: center;
    width: 100%;
    max-width: 700px;
    align-items: center;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;

        h1 { 
            margin-bottom: 24px;
            
        }

        a { 
            color: #F4EDE8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: background-color 0.2s;

            &:hover {
                background: ${shade(0.2, '#f4ede8')}
            }
        }
    }

    > a {
        color: #FF9000;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: background-color 0.2s;
            display: flex;
            align-items: center;
            margin-right: 16px;

            &:hover {
                color: ${shade(0.2, '#ff9000')}
            }
    }

`

export const Background = styled.div`
    flex: 1;
    background: url(${signInBackgroundImg}) no-repeat center;
    background-size: cover;
`

