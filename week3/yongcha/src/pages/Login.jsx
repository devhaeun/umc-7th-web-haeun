import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import WhiteTitle from "../components/WhiteTitle";
import Style from '../components/styled-form';

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
                
                <Style.SubmitInput type={'submit'} />
            </form>
        </Style.CenterDiv>
    );
};

export default Login;