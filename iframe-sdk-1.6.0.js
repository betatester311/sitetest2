var Yousign = (function () {
    'use strict';

    var EventType;
    (function (EventType) {
        EventType["STARTED"] = "started";
        EventType["SUCCESS"] = "success";
        EventType["ERROR"] = "error";
        EventType["PING"] = "ping";
        EventType["DECLINED"] = "declined";
        EventType["SIGNATURE_DONE"] = "signature.done";
    })(EventType || (EventType = {}));

    class InvalidSignatureLink extends Error {
        constructor() {
            super();
            this.name = 'InvalidSignatureLink';
            this.message = 'The signature link is invalid.';
        }
    }
    class IframeContainerNotFound extends Error {
        constructor(iframeContainerId) {
            super();
            this.name = 'IframeContainerNotFound';
            this.message = `The iFrame container with the id "${iframeContainerId}" is not found.`;
        }
    }
    class InvalidCallbackFunction extends Error {
        constructor(eventType) {
            super();
            this.name = 'InvalidCallbackFunction';
            this.message = `Callback on ${eventType} event is not a function.`;
        }
    }

    class Yousign {
        constructor({ signatureLink, iframeContainerId, isSandbox, iframeAttributes }) {
            this.childOrigin = /^https:\/\/yousign.app$/;
            this.eventCallbacks = {};
            let sLink;
            try {
                sLink = new URL(signatureLink);
            }
            catch (_a) {
                throw new InvalidSignatureLink();
            }
            const iframeContainer = document.getElementById(iframeContainerId);
            if (!iframeContainer) {
                throw new IframeContainerNotFound(iframeContainerId);
            }
            if (isSandbox) {
                sLink.searchParams.append('disable_domain_validation', 'true');
            }
            this.urlParams = new Proxy(sLink.searchParams, {
                get: (searchParams, property) => searchParams.get(property),
            });
            this.iframe = document.getElementById('yousign-iframe');
            if (!this.iframe) {
                this.iframe = document.createElement('iframe');
                this.iframe.id = 'yousign-iframe';
                iframeContainer.appendChild(this.iframe);
            }
            this.iframe.src = sLink.href;
            if (iframeAttributes === null || iframeAttributes === void 0 ? void 0 : iframeAttributes.referrerPolicy) {
                this.iframe.referrerPolicy = iframeAttributes.referrerPolicy;
            }
            this.messageHandler = this.receiveMessage.bind(this);
            window.addEventListener('message', this.messageHandler, false);
        }
        receiveMessage(event) {
            const { origin, data } = event;
            if (origin.match(this.childOrigin)) {
                if (data.type === 'yousign' &&
                    this.eventCallbacks[data.event] &&
                    typeof this.eventCallbacks[data.event] === 'function') {
                    this.eventCallbacks[data.event](data);
                }
            }
            if (data.type === '__ubble' && data.payload.redirectUrl) {
                this.iframe.src = `${data.payload.redirectUrl}&k=${this.urlParams.k}`;
            }
        }
        onStarted(fn) {
            if (typeof fn !== 'function') {
                throw new InvalidCallbackFunction(EventType.STARTED);
            }
            this.eventCallbacks.started = fn;
        }
        onSuccess(fn) {
            if (typeof fn !== 'function') {
                throw new InvalidCallbackFunction(EventType.SUCCESS);
            }
            this.eventCallbacks.success = fn;
        }
        onError(fn) {
            if (typeof fn !== 'function') {
                throw new InvalidCallbackFunction(EventType.ERROR);
            }
            this.eventCallbacks.error = fn;
        }
        onPing(fn) {
            if (typeof fn !== 'function') {
                throw new InvalidCallbackFunction(EventType.PING);
            }
            this.eventCallbacks.ping = fn;
        }
        onDeclined(fn) {
            if (typeof fn !== 'function') {
                throw new InvalidCallbackFunction(EventType.DECLINED);
            }
            this.eventCallbacks.declined = fn;
        }
        onSignatureDone(fn) {
            if (typeof fn !== 'function') {
                throw new InvalidCallbackFunction(EventType.SIGNATURE_DONE);
            }
            this.eventCallbacks['signature.done'] = fn;
        }
        removeMessageListener() {
            window.removeEventListener('message', this.messageHandler);
        }
    }

    return Yousign;

})();
