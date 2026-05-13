'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type ModalType = 'visit' | 'brochure' | 'floorplan' | 'enquiry' | null

interface ModalContextValue {
  activeModal: ModalType
  /** Optional context string (e.g. residence slug) passed through to the form. */
  modalContext: string | undefined
  openModal: (modal: ModalType, context?: string) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextValue>({
  activeModal: null,
  modalContext: undefined,
  openModal: () => {},
  closeModal: () => {},
})

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [modalContext, setModalContext] = useState<string | undefined>(undefined)

  const openModal = useCallback((modal: ModalType, context?: string) => {
    setModalContext(context)
    setActiveModal(modal)
  }, [])

  const closeModal = useCallback(() => {
    setActiveModal(null)
    setModalContext(undefined)
  }, [])

  return (
    <ModalContext.Provider value={{ activeModal, modalContext, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
