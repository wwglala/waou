'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var eo = {};
var ea = [];
var noop = function () { };
exports.MODAL_TYPE = void 0;
(function (MODAL_TYPE) {
    MODAL_TYPE["MODAL"] = "modal";
    MODAL_TYPE["SIDE_SHEET"] = "sideSheet";
})(exports.MODAL_TYPE || (exports.MODAL_TYPE = {}));

var ModalContext = React.createContext({
    init: false,
    config: null,
    modalStoreRef: { current: [] },
    setVisibleIds: noop,
    updateAndSaveModal: noop,
    destroyById: noop
});
var ModalInsContext = React.createContext({
    setModalProps: noop,
    onResolve: noop,
    onReject: noop
});

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
    var modalId = props.modalId, type = props.type, resolve = props.resolve, reject = props.reject, visibleIds = props.visibleIds, modalProps = props.modalProps, children = props.children;
    var config = React.useContext(ModalContext).config;
    var setVisibleIds = React.useContext(ModalContext).setVisibleIds;
    var _a = React.useState(modalProps), injectModalProps = _a[0], setModalProps = _a[1];
    var ModalComponent = config[type];
    var onClose = function () {
        setVisibleIds(function (beforeVids) { return beforeVids.filter(function (id) { return id !== modalId; }); });
    };
    var onResolve = function (value) {
        resolve(value);
        onClose();
    };
    var onReject = function (e) {
        reject(e);
        onClose();
    };
    var ModalInsContextValue = React.useMemo(function () { return ({
        setModalProps: setModalProps,
        onResolve: onResolve,
        onReject: onReject
    }); }, []);
    return (React__default["default"].createElement(ModalComponent, __assign({ visible: visibleIds.includes(modalId), onCancel: onReject, onOk: onResolve }, injectModalProps),
        React__default["default"].createElement(ModalInsContext.Provider, { value: ModalInsContextValue }, children)));
};
var Portal = React.memo(function (props) {
    var visibleIds = props.visibleIds;
    var modalStoreRef = React.useContext(ModalContext).modalStoreRef;
    return (React__default["default"].createElement(React__default["default"].Fragment, null, modalStoreRef.current.map(function (modalInstance, idx) {
        var Component = modalInstance.Component, props = modalInstance.props;
        // eslint-disable-next-line react/prop-types
        var modalProps = props.modalProps, insProps = __rest(props, ["modalProps"]);
        return (React__default["default"].createElement(RenderModal, __assign({ key: idx }, modalInstance, { visibleIds: visibleIds, modalProps: modalProps }),
            React__default["default"].createElement(Component, __assign({}, insProps))));
    })));
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

var ModalProvider = React.memo(function (props) {
    var modal = props.modal, sideSheet = props.sideSheet, children = props.children;
    var _a = React.useState([]), visibleIds = _a[0], setVisibleIds = _a[1];
    // context link
    var config = React.useContext(ModalContext).config;
    var modalConfig = React.useMemo(function () {
        if (!modal || !sideSheet) {
            return config;
        }
        return { modal: modal, sideSheet: sideSheet };
    }, [modal, sideSheet, config]);
    var modalStoreRef = React.useRef([]);
    var destroyById = function (modalId) {
        modalStoreRef.current = modalStoreRef.current.filter(function (mins) { return mins.modalId !== modalId; });
    };
    var contextValue = React.useMemo(function () { return ({
        init: true,
        config: modalConfig,
        modalStoreRef: modalStoreRef,
        setVisibleIds: setVisibleIds,
        destroyById: destroyById,
        updateAndSaveModal: updateAndSaveModal(modalStoreRef)
    }); }, [modalConfig]);

    console.log('>>>>>');
    return (React__default["default"].createElement(ModalContext.Provider, { value: contextValue },
        children,
        React__default["default"].createElement(Portal, { visibleIds: visibleIds })));
});

var useInjectProps = function () {
    var _a = React.useContext(ModalInsContext), setModalProps = _a.setModalProps, otherProps = __rest(_a, ["setModalProps"]);
    return __assign(__assign({}, otherProps), { setModalProps: (setModalProps) });
};

/* eslint-disable react-hooks/rules-of-hooks */
var useModalId = function (context) {
    var _a;
    var modalStoreRef = React.useContext(ModalContext).modalStoreRef;
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
            modalId: React.useMemo(function () { return Symbol('useModal_id'); }, []),
            component: context
        };
    }
};

var useUpdateAndSaveModal = function (type, component, props, deps) {
    var _a = React.useContext(ModalContext), setVisibleIds = _a.setVisibleIds, updateAndSaveModal = _a.updateAndSaveModal, destroyById = _a.destroyById;
    var _b = useModalId(component), modalId = _b.modalId, functionComponent = _b.component;
    var currentModalProps = {
        type: type,
        modalId: modalId,
        Component: functionComponent,
        props: props
    };
    // update
    React.useMemo(function () {
        return updateAndSaveModal(__assign(__assign({}, currentModalProps), { resolve: noop, reject: noop, props: props }));
    }, deps);
    // update
    React.useEffect(function () {
        setVisibleIds(function (beforeVids) {
            return beforeVids.includes(modalId) ? __spreadArray([], beforeVids, true) : beforeVids;
        });
    }, deps);
    // destroy
    React.useEffect(function () {
        destroyById(modalId);
    }, [modalId]);
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
var createModalHook = function (type) {
    var useModal = function (component, props, deps) {
        if (deps === void 0) { deps = ea; }
        var init = React.useContext(ModalContext).init;
        if (!init) {
            throw new Error("useModal !\n      please use the ModalProvider to init!\n      like this: <ModalProvider modal={Modal} sideSheet={sideSheet}>{children}</ModalProvider>\n    ");
        }
        var dispatch = useUpdateAndSaveModal(type, component, props, deps);
        return [dispatch];
    };
    useModal.useRegister = function (modalId, Component) {
        var _a = React.useContext(ModalContext), init = _a.init, updateAndSaveModal = _a.updateAndSaveModal;
        if (!init) {
            throw new Error("useModal !\n    please use the ModalProvider to init!\n    like this: <ModalProvider modal={Modal} sideSheet={sideSheet}>{children}</ModalProvider>\n  ");
        }
        React.useMemo(function () {
            updateAndSaveModal({
                type: type,
                modalId: modalId,
                Component: Component,
                props: eo,
                reject: noop,
                resolve: noop
            });
        }, []);
    };
    return useModal;
};

exports.ModalProvider = ModalProvider;
exports.createModalHook = createModalHook;
exports.useInjectProps = useInjectProps;
