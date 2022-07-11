import React, { createContext, useMemo, useRef, useContext, useLayoutEffect, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

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

var initCount = 0;
var PROVIDER_SYMBOL = Symbol("ModalProvider_id");
var Context = createContext({
    modalContainer: { current: [] },
    updateModal: function (f) { },
    registerModal: function (f) { }
});
function useModal(Component, modalProps, deps) {
    if (deps === void 0) { deps = []; }
    var id = useMemo(function () { return Symbol("useModal_id"); }, []);
    var firstLoad = useRef(true);
    // 生产环境中 fiber._owner 不适用
    // const context: ContextType | null = useMemo(() => {
    //   const fiber: any =
    //     typeof Component === "function" ? <Component /> : Component;
    //   let parent = fiber._owner;
    //   while (parent) {
    //     if (parent.type[PROVIDER_SYMBOL]) {
    //       return parent.type.context;
    //     }
    //     parent = parent.return;
    //   }
    //   return null;
    // }, []);
    var context = useContext(Context);
    if (!context) {
        throw new Error("useModal !\n\n    please abide by React.Context usage, use the ModalProvider to init!\n    like this: <ModalProvider>{children}</ModalProvider>\n  ");
    }
    var modalContainer = context.modalContainer, registerModal = context.registerModal, updateModal = context.updateModal;
    var dispatch = function (visible, outProps) {
        var _a = outProps || {}, dispatchModalProps = _a.modalProps, props = _a.props, otherProps = __rest(_a, ["modalProps", "props"]);
        updateModal(function (store) {
            return store.map(function (item) {
                var selfVisible = item.id === id ? visible : item.visible;
                var outModalProps = item.id === id
                    ? __assign(__assign({}, modalProps), dispatchModalProps) : item.modalProps;
                var outProps = item.id === id
                    ? __assign(__assign({}, props), otherProps) : item.props;
                var config = __assign(__assign({}, item), { visible: selfVisible, modalProps: outModalProps, props: outProps });
                return config;
            });
        });
    };
    useLayoutEffect(function () {
        registerModal(function (store) { return __spreadArray(__spreadArray([], store, true), [
            {
                id: id,
                Component: Component,
                visible: false,
                modalProps: modalProps,
                dispatch: dispatch
            },
        ], false); });
        return function () {
            registerModal(function (store) {
                return store.filter(function (item) { return item.id !== id; });
            });
        };
    }, []);
    useEffect(function () {
        if (firstLoad.current) {
            firstLoad.current = false;
            return;
        }
        var target = modalContainer.current.find(function (item) { return item.id === id; });
        var isShow = target === null || target === void 0 ? void 0 : target.visible;
        if (!isShow) {
            registerModal(function (store) {
                return store.map(function (item) {
                    return __assign(__assign({}, item), { Component: item.id === id ? Component : item.Component });
                });
            });
            return;
        }
        updateModal(function (store) {
            return store.map(function (item) {
                return __assign(__assign({}, item), { Component: item.id === id ? Component : item.Component });
            });
        });
    }, deps);
    return [dispatch];
}
function Portal(props) {
    var modalStore = props.modalStore, modalRoot = props.modalRoot, config = props.config;
    var getModal = function (Component) {
        if (React.isValidElement(Component)) {
            return { Modal: config.Dialog, Component: Component };
        }
        else if (typeof Component === "function") {
            return { Modal: config.Dialog, Component: React.createElement(Component, null) };
        }
        var type = Component.type, Com = Component.Component;
        var Modal = type === "Drawer" ? config.Drawer : config.Dialog;
        var Container = typeof Com === "function" ? React.createElement(Com, null) : Com;
        return { Modal: Modal, Component: Container };
    };
    return ReactDOM.createPortal(React.createElement(React.Fragment, null, modalStore.map(function (item, key) {
        var Component = item.Component, visible = item.visible, dispatch = item.dispatch, modalProps = item.modalProps, props = item.props;
        var _a = getModal(Component), Modal = _a.Modal, Com = _a.Component;
        var onClose = function () { return dispatch(false, { modalProps: modalProps, props: props }); };
        return (React.createElement(Modal, __assign({ key: key, onClose: onClose, onCancel: onClose, onOk: onClose, visible: visible }, modalProps), React.cloneElement(Com, __assign(__assign({}, props), { dispatch: dispatch, __onClose: onClose }))));
    })), modalRoot.current);
}
var ModalProvider = function (props) {
    var config = props.config, children = props.children;
    var modalContainer = useRef([]);
    var _a = useState(modalContainer.current), modalStore = _a[0], setModalStore = _a[1];
    var modalRoot = useRef(document.createElement("div"));
    var updateModal = function (f) {
        modalContainer.current = f(modalContainer.current);
        setModalStore(__spreadArray([], modalContainer.current, true));
    };
    var registerModal = function (f) {
        modalContainer.current = f(modalContainer.current);
    };
    useMemo(function () {
        ModalProvider[PROVIDER_SYMBOL] = true;
        ModalProvider.context = {
            modalContainer: modalContainer,
            registerModal: registerModal,
            updateModal: updateModal
        };
    }, []);
    useEffect(function () {
        modalRoot.current.id = "useModal_root_container".concat(initCount++);
        document.body.append(modalRoot.current);
        return function () {
            var _a;
            (_a = modalRoot.current) === null || _a === void 0 ? void 0 : _a.remove();
        };
    }, []);
    var modalAction = useMemo(function () { return ({ modalContainer: modalContainer, updateModal: updateModal, registerModal: registerModal }); }, []);
    return (React.createElement(Context.Provider, { value: modalAction },
        children,
        React.createElement(Portal, { config: config, modalStore: modalStore, modalRoot: modalRoot })));
};

export { ModalProvider, useModal };
