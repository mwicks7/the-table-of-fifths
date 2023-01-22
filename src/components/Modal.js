import React from 'react'
import './Modal.scss'

const Modal = props => {
  const modalRef = React.useRef()

  React.useEffect(() => {
    const clickOutsideModal = (e) => {
      if (e.target === modalRef.current) props.setShow(false)
    }
    const escapeKeyDown = (e) => {
      if (e.key === 'Escape') props.setShow(false)
    }

    window.addEventListener('click', clickOutsideModal)
    window.addEventListener('keydown', escapeKeyDown)

    return () => {
      window.removeEventListener('click', clickOutsideModal)
      window.removeEventListener('keydown', escapeKeyDown)
    }
  }, [props])

  return (
    <div ref={modalRef} className={`modal ${props.show ? 'is--open' : ''}`} open={props.show}>
      <div className="modal__content" role="dialog" aria-labelledby="modal__title" aria-describedby="modal__body" tabIndex={1}>
        <div className="modal__header">
          <h2 id="modal__title" className="modal__title">{props.header}</h2>
          <button onClick={() => props.setShow(false)} className="modal__close" aria-label="Close modal">&times;</button>
        </div>
        <div className="modal__body">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Modal
