self.addEventListener('push', function (event) {
    const data = event.data.json();
    const { title, body, icon } = data.notification;

    const options = {
        body: body,
        icon: icon,
        badge: icon,
        data: data.data || {}
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    let redirect = '/';
    let searchParams = null;
    try {
        const notificationData = event.notification.data;
        redirect = notificationData?.redirect || '/';
        searchParams = notificationData?.searchParams || null;
    } catch (e) {
        //Fallback
    }

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
            const base = self.location.origin;

            let matchingClient = null;

            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];

                if (client.url === base + redirect) {
                    matchingClient = client;
                    break;
                }
            }

            if (!matchingClient) {
                for (let i = 0; i < clientList.length; i++) {
                    const client = clientList[i];

                    if (client.visibilityState === 'visible') {
                        matchingClient = client;
                        break;
                    }
                }
            }

            function addSearchParamsToUrl(url, paramsObj) {
                try {
                    const urlObj = new URL(url, self.location.origin);
                    Object.entries(paramsObj).forEach(([key, value]) => {
                        urlObj.searchParams.set(key, value);
                    });
                    return urlObj.toString();
                } catch (e) {
                    return url;
                }
            }

            if (matchingClient) {
                let finalUrl = base + redirect;
                if (searchParams) {
                    finalUrl = addSearchParamsToUrl(matchingClient.url, searchParams);
                }
                let focused = false;
                if ('focus' in matchingClient) {
                    matchingClient.focus();
                    focused = true;
                }
                if ('navigate' in matchingClient) {
                    return matchingClient.navigate(finalUrl);
                }
                if (!focused || !('navigate' in matchingClient)) {
                    if (clients.openWindow) {
                        return clients.openWindow(finalUrl);
                    }
                }
                return;
            }

            let finalUrl = base + redirect;
            if (searchParams) {
                finalUrl = addSearchParamsToUrl(base, searchParams);
            }
            if (clients.openWindow) return clients.openWindow(finalUrl);
            return;
        })
    );
});
