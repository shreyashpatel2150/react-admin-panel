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

export function confirmationAlert(onConfirm: () => void, message?: string): void {
    Swal.fire({
        title: message || "Are you sure?",
        text : "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm()
        }
    });
}