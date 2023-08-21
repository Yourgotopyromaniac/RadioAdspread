import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ResetPasswordSuccess = ({mailAddress, closeModal}) => {


    return (
        <ResetPasswordContainer>
            <ResetPasswordWrapper>
            <ContentWrapper>
                <i class="fa fa-envelope"></i>
                    <Header>check your email</Header>
                    <Text>we sent a password reset link to {mailAddress}</Text>
                    <ButtonContainer>
                        <Link to="/">
                        <Button onClick={()=> closeModal(false)}>back to log in</Button>
                        </Link>
                    </ButtonContainer>
            </ContentWrapper>
            </ResetPasswordWrapper>
        </ResetPasswordContainer>
    )
}

export default ResetPasswordSuccess;

const ResetPasswordContainer = styled.div`
width: 100%;
height: 100vh;
background: #004643;
position: absolute;
top: 0;
z-index: 9999;
`
const ResetPasswordWrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
`
const ContentWrapper = styled.div`
padding: 40px 35px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 20px;
max-width: 500px;
background-color: #fff;
& i {
    font-size: 40px;
    color: #f99b28;
}
`
const Header = styled.h1`
font-size: 20px;
font-weight: bold;
text-align: center;
`
const Text = styled.p`
font-size: 18px;
text-transform: lowercase;
::first-letter {
    text-transform: capitalize;
}
`

const ButtonContainer = styled.div`
width: 100%;
display: flex;
justify-content: center;
background-color: #f99b28;
border-radius: 5px;
`
const Button = styled.button`
color: #fff;
padding: 10px 40px;
text-transform: capitalize;
`