import swal from 'sweetalert2';
import { AlertObject } from './alertData';

// Confirm Text
export function ConfirmText(title) {
    let resultVal;
    swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2F8BE6',
        cancelButtonColor: '#F55252',
        confirmButtonText: 'Your text here!',
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-danger ml-1'
        },
        buttonsStyling: false,
    }).then(function (result) {
        resultVal = result.value;
        return resultVal;
    });
}

/**
* This is a generic confirmation alert. 
* @param object the object with properties to be displayed.
* @return {boolean} if confirmed, true, else null.
* 
* For e.g. To generate an warning for example pass 'warning' in type attribute.
*/
export function confirmAlert(object: AlertObject, callback: Function): any {
    swal.fire({
        title: object.title,
        text: object.text,
        icon: object.icon,
        showCancelButton: true,
        confirmButtonColor: '#2F8BE6',
        cancelButtonColor: '#F55252',
        confirmButtonText: object.confirmButtonText,
        customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-danger ml-1'
        },
        buttonsStyling: false,
    }).then(function (res) {
        if (res.value) {
            return callback(true);
        } else {
            return callback(null);
        }
    });
}

export function processNotification(object: AlertObject) {
    swal.fire({
        position: 'bottom-end',
        icon: object.icon,
        title: object.title,
        showConfirmButton: false,
        timer: object.timer,
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false,
    });
}

export function processNotificationWithButton(object: AlertObject, callback: Function): any {
    swal.fire({
        position: 'top-end',
        icon: object.icon,
        title: object.title,
        showCancelButton: !object.cancelButtonDisable,
        timer: object.timer,
        confirmButtonColor: '#2F8BE6',
        cancelButtonColor: '#F55252',
        confirmButtonText: object.confirmButtonText,
        cancelButtonText: object.cancelButtonText,
        customClass: {
            confirmButton: 'btn btn-info ' + object.confirmButton,
            cancelButton: 'btn btn-success ' + object.cancelButton
        },
        buttonsStyling: false,
    }).then(function (res) {
        if (!res.dismiss || res.dismiss.toString() !== "backdrop")
            if (res.value) {
                return callback(true);
            } else {
                return callback(false);
            }
    });
}