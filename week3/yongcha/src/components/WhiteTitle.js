import styled from 'styled-components';

const WhiteTitle = styled.h1`
    color: white;
    font-size: ${({font_size}) => font_size || '1.7em'};
    margin-bottom: ${({margin_bottom}) => margin_bottom || '25px'};
    display: block;
    margin-left: ${({margin_left}) => margin_left || '0'};
`

export default WhiteTitle;