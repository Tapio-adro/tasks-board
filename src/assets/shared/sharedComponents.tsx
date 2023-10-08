import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const StyledXMark = styled.button`
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.buttonGrayText};
  margin-left: 4px;
  border-radius: 4px;
  &:hover {
    background-color: ${(props) => props.theme.colors.buttonGrayHoverBg};
  }
  svg {
    font-weight: normal;
    font-size: 18px;
  }
`;

export function XMark(props: { onClick: () => void }) {
  return (
    <StyledXMark onClick={props.onClick}>
      <FontAwesomeIcon icon={faXmark} />
    </StyledXMark>
  );
}