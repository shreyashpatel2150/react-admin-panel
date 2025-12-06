import Swal from 'sweetalert2';

export function showErrorAlert(message: string, onConfirm?: () => void): Promise<void> {
    return Swal.fire({
        icon: 'error',
        html: message,
        confirmButtonText: 'OK',
    }).then(() => {
        if (onConfirm) {
            onConfirm()
        }
    })
}