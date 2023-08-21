import styled from "styled-components"

export const SetPasswordContainer = styled.div`
position: relative;
`

export const NewPasswordContainer = styled.div`
width: 100%;
background-color: #004643;
display:flex;
flex-direction: column;
justify-content: center;
display: ${props => props.showModal ? "none" : "block"};
`
export const NewPasswordWrapper = styled.div`
width: 100%;
height: 100vh;
color:  #004643;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 30px;
& >div {
    width: 100%;
        max-width: 500px;
        background-color: #fff;
        padding: 20px;
    & > h2 {
        margin-bottom: 10px;
        text-align: center;
        text-transform: lowercase;
        & > span {
            text-transform: capitalize;
        }
    }
    & > form {
    display: flex;
    flex-direction: column;
    gap:30px;
    .form-input-wrap {
        display: flex;
        flex-direction: column;
        & > span {
            color: crimson;
            font-size: 14px;
        }
        & > input{ 
            height: 44px;
            width: 100%;
            padding: 10px;
            border: 1px solid  #004643;
            border-radius: 5px;
            margin-top: 5px;
        }
    }
    }
}
`
export const LogoWrappper = styled.header`
width: 100%;
background: transparent;
display: flex;
justify-content: center;
`
export const ButtonContainer = styled.div`
width: 100%;
background-color: #f99b28;
display: flex;
justify-content: center;
border-radius: 5px;
& > button {
    width: 100%;
    color: #fff;
    padding: 15px 40px;
    font-size: 16px;
}
`
export const ResetPasswordModal = styled.div`
position: absolute;
width: 100%;
height: 100vh;
top: 0;
background-color: #004643;
z-index: 999999;
`
export const ResetPasswordWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
& > div {
    width: 100%;
    max-width: 500px;
    background: #fff;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    & i {
        font-size: 40px;
        color: #f99b28;
    }
    & p {
        font-size: 18px;
        text-transform: lowercase;
        ::first-letter{
            text-transform: uppercase;
        }
    }
    & button {
        width: 100%;
        color: white;
        background: #f99b28;
        padding: 10px 0;
        font-size: 20px;
        border-radius: 5px;
        text-transform: capitalize;
    }

}
`
