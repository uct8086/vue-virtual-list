import { onBeforeUnmount, watch, unref } from 'vue';
import { ResizeObserver } from '@juggle/resize-observer';

export default (triggerRef, callback, disabledRef) => {
    const handleResize = () => {
        if (unref(disabledRef)) {
            return;
        }
        callback && callback();
    };

    const ro = new ResizeObserver(handleResize);

    watch(triggerRef, ($trigger, $oldTrigger) => {
        if ($oldTrigger) {
            ro.unobserve($oldTrigger);
        }
        if ($trigger) {
            ro.observe($trigger);
        }
    });

    onBeforeUnmount(() => {
        ro.disconnect();
    });
};
