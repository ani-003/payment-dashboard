import { create } from 'zustand';

const useProfileModalStore = create((set) => ({
  visible: false,
  openModal: () => set({ visible: true }),
  closeModal: () => set({ visible: false }),
}));

export default useProfileModalStore;
