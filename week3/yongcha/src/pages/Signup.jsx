import { yupResolver } from "@hookform/resolvers/yup";
import WhiteTitle from "../components/WhiteTitle";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import Style from '../components/styled-form';

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

const Signup = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log('submit');
        console.log(data);
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
                
                <Style.SubmitInput type={'submit'} />
            </form>
        </Style.CenterDiv>
    );
};

export default Signup;