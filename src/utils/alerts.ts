import Swal from 'sweetalert2';

export function showErrorAlert(message: string): void {
    Swal.fire({
        icon: 'error',
        html: message,
        confirmButtonText: 'OK',
    })
}