import { yupResolver } from "@hookform/resolvers/yup";
import WhiteTitle from "../components/WhiteTitle";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import Style from '../components/styled-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from "@tanstack/react-query";

const schema = yup.object().shape({
    email: yup
    .string()
    .required('이메일을 입력해주세요')
    .email('이메일 형식이 유효하지 않습니다'),
    password: yup
    .string()
    .required('비밀번호를 입력해주세요')
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .max(16, '비밀번호는 16자 이하여야 합니다'),
    passwordCheck: yup
    .string()
    .required('비밀번호를 한번 더 입력해주세요')
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다')
});

const postSignup = async ({email, password, passwordCheck}) => {
    const { data } = await axios.post('http://localhost:3000/auth/register', {
        email,
        password,
        passwordCheck,
    });
    return data;
}

const Signup = () => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const { mutate:signupMutation } = useMutation({
        mutationFn: postSignup,
        onSuccess: (data) => {
            alert('회원가입 성공');
            navigate('/login', {});
        },
        onError: (error) => {
            console.error('회원가입 실패:', error);
            alert('회원가입 실패');
        }
    })

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        signupMutation({email:data.email, password:data.password, passwordCheck:data.passwordCheck});
    }

    return (
        <Style.CenterDiv>
            <WhiteTitle>회원가입</WhiteTitle>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Style.StyledInput type={'email'}
                placeholder={"이메일을 입력해주세요"}
                {...register("email")} />
                <Style.ErrorMessage style={{color: 'red'}}>{errors.email?.message}</Style.ErrorMessage>
                
                <Style.StyledInput type={'password'}
                placeholder={"비밀번호를 입력해주세요"}
                {...register("password")} />
                <Style.ErrorMessage style={{color: 'red'}}>{errors.password?.message}</Style.ErrorMessage>
                
                <Style.StyledInput type={'password'}
                placeholder={"비밀번호를 한번 더 입력해주세요"}
                {...register("passwordCheck")} />
                <Style.ErrorMessage style={{color: 'red'}}>{errors.passwordCheck?.message}</Style.ErrorMessage>
                
                <Style.SubmitInput disabled={!isValid} type={'submit'} />
            </form>
        </Style.CenterDiv>
    );
};

export default Signup;