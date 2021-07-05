import { SimplrNotification } from '@simplr-wc/notification';

declare global {
    interface Window {
        console: any;
    }
}

/**
 * Overwrites the console loggers and displays a notification in addioton to the classic log
 * */
export function LogDisplayer() {
    const console = (function(oldCons) {
        return {
            log: function(text: any) {
                oldCons.log(text);
                SimplrNotification.open({ title: 'Log', message: text, role: 'info', timeout: 3000 });
            },
            info: function(text: any) {
                oldCons.info(text);
                SimplrNotification.open({ title: 'Info', message: text, role: 'info', timeout: 3000 });
            },
            warn: function(text: any) {
                oldCons.warn(text);
                SimplrNotification.open({ title: 'Warning', message: text, role: 'warning', timeout: 3000 });
            },
            error: function(text: any) {
                oldCons.error(text);
                SimplrNotification.open({ title: 'Error', message: text, role: 'error', timeout: 3000 });
            },
        };
    })(window.console);

    //Then redefine the old console
    window.console = console;
}
