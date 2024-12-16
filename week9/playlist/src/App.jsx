import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { calculateTotal, clearCart, decrease, increase, removeItem } from "./store/cartSlice";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import ModalPortal from "./components/ModalPortal";
import Modal from "./components/Modal";
import { openModal } from "./store/modalSlice";

const App  = () => {
  const state = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  const dispatch = useDispatch();
  // console.log('시작', state);

  useEffect(() => {
    // console.log('디스패치');
    dispatch(calculateTotal());
  }, [dispatch, state.cartItems]);

  const onDecrease = (id, amount) => {
    if (amount===1) dispatch(removeItem(id));
    else dispatch(decrease(id))
  };

  return (
    <>
    <FlexDiv>
      <InnerFlexDiv>
        <H1 color={'white'}>UMC PlayList</H1>
        <BagSpan>
          <FontAwesomeIcon icon={faBagShopping} color={"white"} fontSize={'30px'} />
          <AmountDiv>{state.amount}</AmountDiv>
        </BagSpan>
      </InnerFlexDiv>
    </FlexDiv>

    <Container>
      <H1 color={'black'} marginBottom={'25px'}>당신이 선택한 음반</H1>
      {state.cartItems.map((music, idx) => (
        <ItemDiv key={idx}>
          <img src={music.img} width={'100px'} />
          <InfoDiv>
            <InfoSpan>{music.title} | {music.singer}</InfoSpan>
            <InfoSpan>&#8361; {music.price}</InfoSpan>
          </InfoDiv>
          <Btns>
            <button onClick={()=>dispatch(increase(music.id))}>+</button>
            <div>{music.amount}</div>
            <button onClick={()=>onDecrease(music.id, music.amount)}>-</button>
          </Btns>
        </ItemDiv>
      ))}

      {isOpen && <ModalPortal>
        <Modal>
          <H4>담아두신 모든 음반을 삭제하시겠습니까?</H4>
        </Modal>
      </ModalPortal>}

      <Hr />
      <InnerFlexDiv>
        <span>총 가격</span>
        <span>&#8361; {state.total}</span>
      </InnerFlexDiv>
      <ResetBtn onClick={()=>dispatch(openModal())}>장바구니 초기화</ResetBtn>
    </Container>
    </>
  )
}

export default App;

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: #5638f2;
  height: 80px;
  margin-bottom: 40px;
`

const InnerFlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 800px;
`

const H1 = styled.h1`
  color: ${(props) => props.color};
  font-size: 30px;
  font-weight: bold;
  margin-bottom: ${(props) => props.marginBottom ? props.marginBottom : '0'}
`

const BagSpan = styled.span`
  position: relative;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
`

const AmountDiv = styled.div`
  position: absolute;
  top: -5px;
  right: -7px;
  background-color:rgb(169, 160, 211);
  color: white;
  border-radius: 50%;
  font-size: 10px;
  font-weight: bold;
  padding: 3px;
`

const ItemDiv = styled.div`
  display: flex;
  width: 800px;
  justify-content: space-between;
  align-items: center;
`

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 20px;
`

const InfoSpan = styled.span`
  font-size: 17px;
  line-height: 23px;
`

const Btns = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Hr = styled.hr`
  width: 800px;
  margin: 20px 0 10px 0;
`

const ResetBtn = styled.button`
  background-color: white;
  border: 2px solid red;
  color: red;
  font-weight: bold;
  padding: 8px;
  margin: 10px 0 60px 0;
  &:hover {
    cursor: pointer;
    background-color:rgb(245, 245, 245);
  }
`

const H4 = styled.h4`
  font-weight: bold;
  font-size: 17px;
`