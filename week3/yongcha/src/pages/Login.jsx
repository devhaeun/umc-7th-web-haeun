import WhiteTitle from "../components/WhiteTitle";
import styled from 'styled-components';
import useForm from "../hooks/useForm";
import { validateLogin } from "../utils/validate";

const Login = () => {
    const login = useForm({
        initialValue: {
            email: '',
            password: '',
        },
        validate: validateLogin,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("submit");
    }

    const handlePressLogin = () => {
        console.log(login.values.email, login.values.password)
    }

    return (
        <CenterDiv>
            <WhiteTitle>로그인</WhiteTitle>
            <form noValidate onSubmit={onSubmit}>
                <StyledInput type={'email'}
                error={login.touched.email && login.errors.email}
                placeholder={'이메일을 입력해주세요'}
                {...login.getTextInputProps('email')} />
                {
                    login.touched.email && login.errors.email &&
                    <ErrorMessage>{login.errors.email}</ErrorMessage>
                }
                {/* <ErrorMessage style={{color: 'red'}}>{errors.email?.message}</ErrorMessage> */}
                <StyledInput type={'password'}
                error={login.touched.password && login.errors.password}
                placeholder={'비밀번호를 입력해주세요'}
                {...login.getTextInputProps("password")} />
                {
                    login.touched.password && login.errors.password &&
                    <ErrorMessage>{login.errors.password}</ErrorMessage>
                }
                {/* <ErrorMessage style={{color: 'red'}}>{errors.password?.message}</ErrorMessage> */}
                <SubmitInput
                type={'submit'}
                onClick={handlePressLogin}
                />
            </form>
        </CenterDiv>
    );
};

export default Login;

const ErrorMessage = styled.p`
    // margin-top: -10px;
    // margin-top: 5px;
    margin-bottom: 10px;
    color: red;
`

const CenterDiv = styled.div`
    text-align: center;
    position: absolute;
    // top: 50%;
    left: 50%;
    padding-top: 5em;
    transform: translateX(-50%);
    // transform: translate(-50%, -50%);
`

const StyledInput = styled.input`
    width: 25em;
    height: 3em;
    border-radius: 5px;
    margin-bottom: 5px;
    border: ${props => props.error ? '1px solid red' : '1px solid #ccc'}
`
const SubmitInput = styled.input`
    width: 25em;
    height: 3em;
    border-radius: 5px;
    background-color: red;
    color: white;
    &:hover {
        cursor: pointer;
    }
`