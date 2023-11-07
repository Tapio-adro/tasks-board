import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';


interface StyledXMarkProps {
  readonly $noMarginLeft: boolean;
  readonly $lowerOpacity: boolean;
}
const StyledXMark = styled.button<StyledXMarkProps>`
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.titleTextSubtle};
  margin-left: 4px;
  border-radius: 4px;
  &:hover {
    background-color: ${(props) => props.theme.colors.buttonGreyHoverBg};
  }
  svg {
    font-weight: normal;
    font-size: 18px;
  }
  ${props => props.$noMarginLeft && css`
    margin-left: 0;
  `};
  ${props => props.$lowerOpacity && css`
    opacity: 0.8;
  `};
`;
const StyledIconButton = styled.button`
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.titleTextSubtle};
  border-radius: 4px;
  &:hover {
    background-color: ${(props) => props.theme.colors.buttonGreyHoverBg};
  }
  svg {
    font-weight: normal;
    font-size: 18px;
  }
`;

interface XMarkProps {
  onClick: () => void;
  noMarginLeft?: boolean;
  lowerOpacity?: boolean;
}

const XMark: React.FC<XMarkProps> = ({onClick, noMarginLeft = false, lowerOpacity = false}) => {
  return (
    <StyledXMark onClick={onClick} $noMarginLeft={noMarginLeft} $lowerOpacity={lowerOpacity}>
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