import React from 'react';
import LoadingNotification from "../../ui/Notification/LoadingNotification";
import SuccessNotification from "../../ui/Notification/SuccessNotification";

export default function Notifier({notifications}) {

    function renderItem(notification) {
        switch (notification.type) {
            case 'loading':
                return <LoadingNotification key={notification.id} notification={notification}/>;
            case 'success':
                return <SuccessNotification key={notification.id} notification={notification}/>;
            default:
                return null;
        }
    }

    return (
        <div
            aria-live="assertive"
            className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start" style={{zIndex: 9999}}>
        >
            {/* Global notification live region, render this permanently at the end of the document */}
            <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                {notifications.map(n => {
                    return renderItem(n);
                })}
            </div>
        </div>
    );
}
