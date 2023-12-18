// composables/useNotification.js

import Swal from "sweetalert2";

export function useNotification() {
  const notify = ({ title, text, icon, confirmButtonText }) => {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText,
    });
  };

  const confirm = ({ title, text, icon }) => {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    });
  };

  return {
    notify,
    confirm,
  };
}
