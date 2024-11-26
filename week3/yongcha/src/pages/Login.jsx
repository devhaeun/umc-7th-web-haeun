import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import WhiteTitle from "../components/WhiteTitle";
import Style from '../components/styled-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation} from '@tanstack/react-query';

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

const postLogin = async({email, password}) => {
    const { data } = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
    });
    return data;
}

const Login = () => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();
    const { mutate:loginMutation } = useMutation({
        mutationFn: postLogin,
        onSuccess: (data) => {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            alert("로그인 성공");
            navigate('/', {});
            window.location.reload();
        },
        onError: (error) => {
            console.error("로그인 실패:", error);
            alert('로그인 실패');
        }
    })

    const onSubmit = async(data) => {
        loginMutation({email:data.email, password:data.password});
    }

    return (
        <Style.CenterDiv>
            <WhiteTitle>로그인</WhiteTitle>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Style.StyledInput type={'email'}
                placeholder={"이메일을 입력해주세요"}
                {...register("email")} />
                <Style.ErrorMessage style={{color: 'red'}}>{errors.email?.message}</Style.ErrorMessage>
                
                <Style.StyledInput type={'password'}
                placeholder={"비밀번호를 입력해주세요"}
                {...register("password")} />
                <Style.ErrorMessage style={{color: 'red'}}>{errors.password?.message}</Style.ErrorMessage>
                
                <Style.SubmitInput disabled={!isValid} type={'submit'} />
            </form>
        </Style.CenterDiv>
    );
};

export default Login;