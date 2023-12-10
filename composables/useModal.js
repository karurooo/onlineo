// composables/useModal.js
import { ref } from "vue";

export const useModal = () => {
  const isModalVisible = ref(false);

  const showModal = () => {
    isModalVisible.value = true;
  };

  const hideModal = () => {
    isModalVisible.value = false;
  };

  return { isModalVisible, showModal, hideModal };
};
