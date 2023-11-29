import Swal from "sweetalert2";

const useSwal = (message) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 2000,
  });
};

export default useSwal;
