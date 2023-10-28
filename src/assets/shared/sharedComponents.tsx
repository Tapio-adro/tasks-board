import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';


interface StyledXMarkProps {
  readonly $noMarginLeft: boolean;
}
const StyledXMark = styled.button<StyledXMarkProps>`
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
  ${props => props.$noMarginLeft && css`
    margin-left: 0;
  `};
`;
const StyledIconButton = styled.button`
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.buttonGrayText};
  border-radius: 4px;
  &:hover {
    background-color: ${(props) => props.theme.colors.buttonGrayHoverBg};
  }
  svg {
    font-weight: normal;
    font-size: 18px;
  }
`;

interface XMarkProps {
  onClick: () => void;
  noMarginLeft?: boolean;
}

const XMark: React.FC<XMarkProps> = ({onClick, noMarginLeft = false}) => {
  return (
    <StyledXMark onClick={onClick} $noMarginLeft={noMarginLeft} >
      <FontAwesomeIcon icon={faXmark} />
    </StyledXMark>
  );
}
export { XMark };
export function IconButton(props: { onClick: () => void, children: React.ReactNode }) {
  return (
    <StyledIconButton onClick={props.onClick}>
      {props.children}
    </StyledIconButton>
  );
}