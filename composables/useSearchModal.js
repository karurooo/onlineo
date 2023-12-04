import { ref } from "vue";

const isVisible = ref(false);

export function useSearchModal() {
  function OpenModal() {
    isVisible.value = true;
  }

  function CloseModal() {
    isVisible.value = false;
  }

  return {
    isVisible,
    OpenModal,
    CloseModal,
  };
}
