import React, { createContext, memo, useContext, useState, useMemo, useRef, useCallback, useEffect } from 'react';

var eo = {};
var noop = function () { };
var MODAL_TYPE;
(function (MODAL_TYPE) {
    MODAL_TYPE["MODAL"] = "modal";
    MODAL_TYPE["SIDE_SHEET"] = "sideSheet";
})(MODAL_TYPE || (MODAL_TYPE = {}));

var ModalContext = createContext({
    init: false,
    config: null,
    modalStoreRef: { current: [] },
    setVisibleIds: noop,
    updateAndSaveModal: function () { return function () { }; }
});
var ModalInsContext = createContext({
    setModalProps: noop,
    onResolve: noop,
    onReject: noop
});
// @todo plugin context

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var RenderModal = function (props) {
    var modalId = props.modalId, type = props.type, onOk = props.onOk, onCancel = props.onCancel, modalProps = props.modalProps, visibleIds = props.visibleIds, children = props.children;
    var config = useContext(ModalContext).config;
    var ModalComponent = config[type];
    var _a = useState(modalProps), injectModalProps = _a[0], setModalProps = _a[1];
    var ModalInsContextValue = useMemo(function () { return ({
        setModalProps: setModalProps,
        onResolve: onOk,
        onReject: onCancel
    }); }, []);
    return (React.createElement(ModalComponent, __assign({ visible: visibleIds.includes(modalId), onCancel: onCancel, onOk: onOk }, injectModalProps),
        React.createElement(ModalInsContext.Provider, { value: ModalInsContextValue }, children)));
};
var Render = memo(function (props) {
    var modalId = props.modalId, type = props.type, Component = props.Component, hookParam2Props = props.props, resolve = props.resolve, reject = props.reject, visibleIds = props.visibleIds;
    var modalProps = hookParam2Props.modalProps, insProps = __rest(hookParam2Props, ["modalProps"]);
    var setVisibleIds = useContext(ModalContext).setVisibleIds;
    var onClose = function () {
        setVisibleIds(function (beforeVids) { return beforeVids.filter(function (id) { return id !== modalId; }); });
    };
    var onResolve = function (value) {
        resolve === null || resolve === void 0 ? void 0 : resolve(value);
        onClose();
    };
    var onReject = function (err) {
        reject === null || reject === void 0 ? void 0 : reject(err);
        onClose();
    };
    return (React.createElement(RenderModal, { type: type, modalId: modalId, onCancel: onReject, onOk: onResolve, modalProps: modalProps, visibleIds: visibleIds },
        React.createElement(Component, __assign({}, insProps))));
});
var Portal = memo(function (props) {
    var visibleIds = props.visibleIds;
    var modalStoreRef = useContext(ModalContext).modalStoreRef;
    return (React.createElement(React.Fragment, null, modalStoreRef.current.map(function (ins, idx) { return (React.createElement(Render, __assign({ key: idx }, ins, { visibleIds: visibleIds }))); })));
});

var updateAndSaveModal = function (modalStoreRef) {
    return function (instance) {
        var hasInstance = modalStoreRef.current.find(function (ins) { return ins.modalId === instance.modalId; });
        if (hasInstance) {
            modalStoreRef.current = modalStoreRef.current.map(function (oldIns) {
                if (oldIns.modalId === instance.modalId) {
                    return __assign(__assign({}, instance), { props: __assign(__assign({}, oldIns.props), instance.props) });
                }
                return oldIns;
            });
        }
        else {
            modalStoreRef.current = __spreadArray(__spreadArray([], modalStoreRef.current, true), [instance], false);
        }
        return function () {
            modalStoreRef.current.filter(function (ins) { return ins.modalId !== instance.modalId; });
        };
    };
};

var ModalProvider = memo(function (props) {
    var modal = props.modal, sideSheet = props.sideSheet, children = props.children;
    var _a = useState([]), visibleIds = _a[0], setVisibleIds = _a[1];
    // context link
    var config = useContext(ModalContext).config;
    var modalConfig = useMemo(function () {
        if (!modal || !sideSheet) {
            return config;
        }
        return { modal: modal, sideSheet: sideSheet };
    }, [modal, sideSheet, config]);
    var modalStoreRef = useRef([]);
    var _updateAndSaveModal = useCallback(updateAndSaveModal(modalStoreRef), []);
    var contextValue = useMemo(function () { return ({
        init: true,
        config: modalConfig,
        modalStoreRef: modalStoreRef,
        setVisibleIds: setVisibleIds,
        updateAndSaveModal: _updateAndSaveModal
    }); }, [modalConfig]);
    return (React.createElement(ModalContext.Provider, { value: contextValue },
        children,
        React.createElement(Portal, { visibleIds: visibleIds })));
});

var useInjectProps = function () {
    return useContext(ModalInsContext);
};

/* eslint-disable react-hooks/rules-of-hooks */
var useModalId = function (context) {
    var _a;
    var modalStoreRef = useContext(ModalContext).modalStoreRef;
    if (typeof context === 'string') {
        var component = (_a = modalStoreRef.current.find(function (ins) { return ins.modalId === context; })) === null || _a === void 0 ? void 0 : _a.Component;
        if (!component) {
            throw new Error("useModal: Please check this name [".concat(context, "], Are you registered?"));
        }
        return {
            modalId: context,
            component: component
        };
    }
    else {
        return {
            modalId: useMemo(function () { return Symbol('useModal_id'); }, []),
            component: context
        };
    }
};

var useUpdateAndSaveModal = function (type, component, props, deps) {
    var _a = useContext(ModalContext), setVisibleIds = _a.setVisibleIds, updateAndSaveModal = _a.updateAndSaveModal;
    var _b = useModalId(component), modalId = _b.modalId, functionComponent = _b.component;
    var currentModalProps = {
        type: type,
        modalId: modalId,
        Component: functionComponent,
        props: props
    };
    // update @todo 渲染了才需要更新
    var destroy = useMemo(function () {
        return updateAndSaveModal(__assign(__assign({}, currentModalProps), { resolve: noop, reject: noop, props: props }));
    }, deps);
    useEffect(function () {
        destroy();
    }, []);
    // update
    useEffect(function () {
        setVisibleIds(function (beforeVids) {
            return beforeVids.includes(modalId) ? __spreadArray([], beforeVids, true) : beforeVids;
        });
    }, deps);
    var dispatch = function (visible, dispatchProps) {
        return new Promise(function (resolve, reject) {
            var _a;
            updateAndSaveModal(__assign(__assign({}, currentModalProps), { resolve: resolve, reject: reject, props: __assign(__assign(__assign({}, currentModalProps.props), dispatchProps), { modalProps: __assign(__assign({}, (_a = currentModalProps.props) === null || _a === void 0 ? void 0 : _a.modalProps), dispatchProps === null || dispatchProps === void 0 ? void 0 : dispatchProps.modalProps) }) }));
            // hide
            if (!visible) {
                setVisibleIds(function (beforeVids) { return beforeVids.filter(function (id) { return id !== modalId; }); });
                return;
            }
            // show and update
            setVisibleIds(function (beforeVids) {
                return beforeVids.includes(modalId)
                    ? __spreadArray([], beforeVids, true) : __spreadArray(__spreadArray([], beforeVids, true), [modalId], false);
            });
        });
    };
    return dispatch;
};

/* eslint-disable react-hooks/rules-of-hooks */
var initModalType = function (type) {
    var useModal = function (component, props, deps) {
        if (deps === void 0) { deps = eo; }
        var init = useContext(ModalContext).init;
        if (!init) {
            throw new Error("useModal !\n      please use the ModalProvider to init!\n      like this: <ModalProvider modal={Modal} sideSheet={sideSheet}>{children}</ModalProvider>\n    ");
        }
        var dispatch = useUpdateAndSaveModal(type, component, props, deps);
        return [dispatch];
    };
    return useModal;
};

export { ModalProvider, initModalType, useInjectProps };
