import { ModalContainer } from './styles'

interface ModalProps {
  children: JSX.Element
}

export const Modal = ({ children }: ModalProps): JSX.Element => {
  return <ModalContainer>{children}</ModalContainer>
}
