import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import WhiteTitle from "../components/WhiteTitle";
import styled from 'styled-components';

const Login = () => {
    const schema = yup.object().shape({
        email: yup
        .string()
        .required('이메일을 입력해주세요.')
        .email('이메일 형식이 유효하지 않습니다.'),
        password: yup
        .string()
        .required('비밀번호를 입력해주세요.')
        .min(8, '비밀번호는 8자 이상이어야 합니다.')
        .max(16, '비밀번호는 16자 이하여야 합니다.'),
    });
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log('폼 데이터 제출');
        console.log(data);
    }

    return (
        <CenterDiv>
            <WhiteTitle>로그인</WhiteTitle>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <StyledInput type={'email'} {...register("email")} />
                <ErrorMessage style={{color: 'red'}}>{errors.email?.message}</ErrorMessage>
                <StyledInput type={'password'} {...register("password")} />
                <ErrorMessage style={{color: 'red'}}>{errors.password?.message}</ErrorMessage>
                <SubmitInput type={'submit'} />
            </form>
        </CenterDiv>
    );
};

export default Login;

const ErrorMessage = styled.p`
    // margin-top: -10px;
    margin-top: 5px;
    margin-bottom: 20px;
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
    // margin-bottom: 10px;
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