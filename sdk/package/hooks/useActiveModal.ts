import { atom, useAtom } from "jotai";
import { useCallback } from "react";
import { get } from "lodash";

type ModalProps = {
  backdropClose?: boolean;
  modalProps?: object;
  name: string;
  onClose?: Function;
  props?: object;
};

const defaultProps: ModalProps = {
  name: "",
  props: {},
  modalProps: {},
  backdropClose: true,
};

export const activeModalAtom: any = atom<ModalProps>(defaultProps);

export const useActiveModal = () => {
  const [activeModal, setModal] = useAtom(activeModalAtom);

  const openModal = useCallback(
    (name: string, props: object = {}, modalProps: object = {}) => {
      setModal({ name, props, modalProps });
    },
    [setModal]
  );
  const closeModal = useCallback(
    (...args: any) => {
      const closeFunction = get(activeModal, "props.onClose", () => {});
      // @ts-ignore
      closeFunction(...args);
      setModal(defaultProps);
    },
    [setModal, activeModal]
  );

  return {
    activeModal,
    openModal,
    closeModal,
  } as any;
};
