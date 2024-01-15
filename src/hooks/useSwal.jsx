import Swal from "sweetalert2";

const useSwal = (message, statusIcon) => {
  return Swal.fire({
    position: "center",
    icon: statusIcon,
    title: message,
    showConfirmButton: false,
    timer: 2000,
  });
  
};

export default useSwal;
