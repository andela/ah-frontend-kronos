import { toast } from 'react-toastify';

export function toastSuccess(message, container_id = '') {
  return toast.success(message, {
    containerId: container_id,
  });
}

export function toastFailure(message, container_id = '') {
  toast.error(message, {
    containerId: container_id,
  });
}
