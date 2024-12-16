import { useDispatch } from "react-redux";
import styled from "styled-components";
import { clearCart } from "../store/cartSlice";
import { closeModal } from "../store/modalSlice";

const Modal = ({ children }) => {
    const dispatch = useDispatch();

    const onClickYes = () => {
        console.log('yes');
        dispatch(clearCart());
        dispatch(closeModal());
    };

    const onClickNo = () => {
        console.log('no');
        dispatch(closeModal());
    };

    return (
        <Wrapper>
        <ModalContainer>
            {children}
            <BtnsDiv>
                <ModalBtn color={'#5638f2'}
                onClick={onClickYes}>
                    네
                </ModalBtn>
                <ModalBtn color={'red'}
                onClick={onClickNo}>
                    아니요
                </ModalBtn>
            </BtnsDiv>
        </ModalContainer>
        </Wrapper>
    );
};

export default Modal;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    &::after {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 2;
    }
`

const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 5;
    background-color: white;
    width: 500px;
    height: 200px;
    border-radius: 8px;
    border: 2px solid #5638f2;
`

const BtnsDiv = styled.div`
    width: 250px;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
`

const ModalBtn = styled.button`
    background-color: white;
    border: ${(props) => `1px solid ${props.color}`};
    border-radius: 3px;
    color: ${(props)=>props.color};
    font-weight: bold;
    font-size: 15px;
    padding: 8px;
    width: 70px;
    &:hover {
    cursor: pointer;
    background-color:rgb(245, 245, 245);
    }
`